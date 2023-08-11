import axios from "axios";

import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } from "../config/SpotifyApiConfig"


class TokenManager {

    // time before token reset in ms
    // TOKEN_VALID_LENGTH = 3590000
    TOKEN_VALID_LENGTH = 40000

    constructor() {
        this.token = undefined;
        this.valid = false;
        this.dateSet = undefined;
        this.timeoutReference = undefined;
        this.codeVerifier = undefined;

        console.log("constructing token manager")

        if (localStorage.getItem("code_verifier")) {
            this.token = localStorage.getItem("spotify_token");
            this.codeVerifier = localStorage.getItem("code_verifier")
            this.dateSet = new Date(new Number(localStorage.getItem("spotify_token_set")));
            this.valid = true;
        }

        this.establishTimer();
        console.log("token is", this.token)
    }

    establishTimer() {
        if (this.dateSet == undefined || this.dateSet == null) return;
        const expirationTime = this.TOKEN_VALID_LENGTH - (Date.now() - this.dateSet.valueOf());
        console.log("time to expiration", expirationTime, Date.now(), this.dateSet.valueOf())
        this.timeoutReference = setTimeout(() => {
            console.log("token expired")
            this.clearToken();
        }, expirationTime);
    }

    calculateExpiration() {
        if (this.dateSet == undefined)
            return -1;
        return this.TOKEN_VALID_LENGTH - (Date.now() - this.dateSet.valueOf());
    }


    async setToken(token) {
        if (!await this.validateToken(token))
            return false;
        this.token = token;
        this.valid = true;
        this.dateSet = new Date(Date.now());
        localStorage.setItem("spotify_token", token);
        localStorage.setItem("spotify_token_set", Date.now());
        console.log("setting local storage", localStorage.getItem("spotify_token"));
        this.establishTimer();
        return true;
    }

    clearToken() {
        console.log("clearing token")
        if (!this.valid) return
        this.valid = false;
        this.token = undefined;
        this.dateSet = undefined;
        clearTimeout(this.timeoutReference);
        localStorage.removeItem("spotify_token");
        localStorage.removeItem("spotify_token_set")
    }

    async validateToken(token) {
        console.log("validating token...", token, this.codeVerifier)
        if (!token && this.token) token = this.token;
        if (!token || !this.codeVerifier) return false;
        try {
            const response = await axios.get(`
            https://api.spotify.com/v1/me`, { headers: { Authorization: `Bearer ${token}` } })
            const userId = response.data.id;
            if (userId) return true;
        } catch (e) {
            this.clearToken()
            return false;
        }
        this.clearToken()
        return false;
    }

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

    forceLink() {
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

    setCode(code) {
        this.code = code;
    }

    async requestToken() {
        if (!this.code) return false;
        let codeVerifier = this.codeVerifier;
        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: this.code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: codeVerifier
        });
        try {
            const response = await axios.post(`
            https://accounts.spotify.com/api/token`, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            const token = response.data.access_token;
            console.log("new token:", token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    hasToken() {
        return true && this.token;
    }
}

export const tokenManager = new TokenManager();