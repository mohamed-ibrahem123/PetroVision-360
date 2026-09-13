import React from 'react';
import './StepsIndicator.css';

export default function StepsIndicator({ currentStep }) {
  const steps = [
    { num: 1, name: 'Step 1', desc: 'Choose Your Role' },
    { num: 2, name: 'Step 2', desc: 'Facility Information' },
    { num: 3, name: 'Step 3', desc: 'Upload Evidence' }
  ];

  return (
    <div className="pv-stepper-v2">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;
        let stepClass = 'pv-step-v2';
        if (isCompleted) stepClass += ' pv-step-v2-completed';
        if (isActive) stepClass += ' pv-step-v2-active';

        return (
          <React.Fragment key={step.num}>
            <div className={stepClass}>
              <div className="pv-step-v2-circle">
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <div className="pv-step-v2-info">
                <span className="pv-step-v2-name">{step.name}</span>
                <span className="pv-step-v2-desc">{step.desc}</span>
              </div>
            </div>

            {/* Connecting Line (except after last step) */}
            {index < steps.length - 1 && (
              <div className="pv-stepper-line">
                <div 
                  className="pv-stepper-line-progress" 
                  style={{ width: currentStep > index + 1 ? '100%' : '0%' }}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
