import { CheckIcon } from "lucide-react"

interface Step {
  id: number
  name: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? "pr-8" : ""}`}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-muted" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary" aria-hidden="true">
                    {step.id}
                  </span>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-muted" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                  <span className="text-sm font-medium text-muted-foreground" aria-hidden="true">
                    {step.id}
                  </span>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}

            <span className="absolute -bottom-6 w-full text-center text-sm font-medium">{step.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
