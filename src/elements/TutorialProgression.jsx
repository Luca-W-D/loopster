export default function TutorialProgression({ tutorialState, setTutorialState }) {
  const mapToStatus = (currentState, indexOfStart, length = 1) => {
    if(currentState < indexOfStart) return "upcoming";
    if(currentState > indexOfStart + length - 1) return "complete";
    return "current";
  }
    const steps = [
      { id: 'Intro', state: 0, status: mapToStatus(tutorialState, 0) },
      { id: 'History', state: 1, status: mapToStatus(tutorialState, 1) },
      { id: 'Explorer', state: 2, status: mapToStatus(tutorialState, 2, 2) },
      { id: 'Playlists', state: 4, status: mapToStatus(tutorialState, 4, 4) },
    ]
    return (
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, i) => {
            return <li key={i} className="md:flex-1 hover:cursor-pointer" onClick={() => setTutorialState(step.state)}>
              {step.status === 'complete' ? (
                <a
                  href={step.href}
                  className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
                </a>
              ) : step.status === 'current' ? (
                <a
                  id="progressOngoing"
                  href={step.href}
                  className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-indigo-600">{step.id}</span>
                </a>
              ) : (
                <a
                  href={step.href}
                  className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-gray-700">{step.id}</span>
                </a>
              )}
            </li>
    })}
        </ol>
      </nav>
    )
  }
  