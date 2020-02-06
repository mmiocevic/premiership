import React from 'react';

export interface RoundChangerComponentProps {
   selectedRoundId: number;
   roundIds: number[];
   onRoundIdChange: (roundId: number) => void;
}

export const RoundChangerComponent = (
   {
      selectedRoundId,
      roundIds,
      onRoundIdChange
   }: RoundChangerComponentProps): JSX.Element => {
   return (
      <select
         className="round-changer"
         value={selectedRoundId}
         onChange={(e) => onRoundIdChange(roundIds[e.currentTarget.selectedIndex])}
      >
         {roundIds.map(round => (
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