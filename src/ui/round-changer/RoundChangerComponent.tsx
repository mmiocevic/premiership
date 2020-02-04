import React from 'react';

interface RoundChangerComponentProps {
   selectedRoundId: number;
   rounds: number[];
   onRoundChange: (round: number) => void;
}

export const RoundChangerComponent = (
   {
      selectedRoundId,
      rounds,
      onRoundChange
   }: RoundChangerComponentProps): JSX.Element => {
   return (
      <select
         className="round-changer"
         value={selectedRoundId}
         onChange={(e) => onRoundChange(rounds[e.currentTarget.selectedIndex])}
      >
         {rounds.map(round => (
            <option
               value={round}
               key={round}
            >
               Round: {round}
            </option>
         ))}
      </select>
   );
};