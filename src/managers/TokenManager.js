import axios from "axios";

import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE, TOKEN_VALID_LENGTH } from "../config/SpotifyApiConfig"


class TokenManager {

    // time before token reset in ms
    // TOKEN_VALID_LENGTH = 3590000
    // TOKEN_VALID_LENGTH = 40000
    codeVerifier; // string used to obtain code
    code; // spotify response to obtain token
    token; // can be used in API requests
    refreshToken;
    whenTokenSet;

    constructor() {
        // if code has set, then assume that a request has been made
        if (localStorage.getItem("token")) {
            this.codeVerifier = localStorage.getItem("code_verifier");
            this.code = localStorage.getItem("code");
            this.token = localStorage.getItem("token");
            this.refreshToken = localStorage.getItem("refreshToken");
            this.whenTokenSet = localStorage.getItem("whenTokenSet");
        }
    }

    wipe() {
        localStorage.removeItem("code");
        localStorage.removeItem("code_verifier");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("whenTokenSet");
        this.codeVerifier = undefined;
        this.code = undefined;
        this.token = undefined;
        this.whenTokenSet = undefined;
    }

    requestPermissions() {
        this.codeVerifier = this.generateRandomString(128);
        this.generateCodeChallenge(this.codeVerifier).then(codeChallenge => {
            let state = this.generateRandomString(16);
            localStorage.setItem('code_verifier', this.codeVerifier);
            let args = new URLSearchParams({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: SCOPE,
                redirect_uri: REDIRECT_URI,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });
            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });
    }

    async setCode(code) {
        this.code = code;
        localStorage.setItem('code', code);
        this.codeVerifier = localStorage.getItem("code_verifier");
        await this.requestToken();
    }

    setToken(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.whenTokenSet = Date.now();
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("whenTokenSet", this.whenTokenSet);
    }

    async requestToken() {
        if (!this.code) return false;
        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: this.code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: this.codeVerifier
        });
        try {
            const response = await axios.post(`
            https://accounts.spotify.com/api/token`, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            // success case (set token + timers)
            const token = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            this.setToken(token, refreshToken);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    calculateTimeToExpiration() {
        if (this.whenTokenSet == undefined) this.whenTokenSet = localStorage.getItem("whenTokenSet");
        if (this.whenTokenSet == undefined) return -1;
        return TOKEN_VALID_LENGTH - (Date.now() - this.whenTokenSet.valueOf());
    }

    async requestRefreshToken() {
        let body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
            client_id: CLIENT_ID,
        });
        try {
            const response = await axios.post(`
            https://accounts.spotify.com/api/token`, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            // success case (set token + timers)
            this.setToken(response.data.access_token, response.data.refresh_token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getSafeToken() {
        if (this.calculateTimeToExpiration() < 100)
            await this.requestRefreshToken();
        return this.token;
    }

    async isReady() {
        if (!this.code) return false;
        if (this.token && this.calculateTimeToExpiration() > 0) return true;
        // otherwise, we can request a token but haven't yet – do so.
        console.log("code set, but either token not set or token expired");
        console.log("token", this.token);
        console.log("refreshToken", this.refreshToken);
        console.log(this.calculateTimeToExpiration());
        return false;
    }

    hasData() {
        if (this.code || this.codeVerifier || this.token || this.whenTokenSet) return true;
        return false;
    }

    // ####################
    // AUTHORIZATION HELPERS
    // ####################

    generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
            return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return base64encode(digest);
    }

}

export const tokenManager = new TokenManager();
