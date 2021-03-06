import React from 'react';
import { useTheme } from '../../components/layout';

const Jobs = props => {
  const white = useTheme().homepage.white;
  return (
    <svg width={28} height={24} fill="none" viewBox="0 0 28 24" {...props}>
      <path
        d="M18.375 4.286c0-.455-.184-.891-.513-1.212a1.769 1.769 0 0 0-1.237-.503h-5.25c-.464 0-.91.181-1.237.503a1.697 1.697 0 0 0-.513 1.212v.857H7v-.857c0-1.137.46-2.227 1.281-3.03A4.422 4.422 0 0 1 11.375 0h5.25c.575 0 1.143.11 1.674.326.531.216 1.013.531 1.42.93.406.397.728.87.948 1.39.22.52.333 1.077.333 1.64v.857h4.375C26.828 5.143 28 6.29 28 7.714V21.43C28 22.85 26.828 24 25.375 24H2.625c-.696 0-1.364-.27-1.856-.753A2.545 2.545 0 0 1 0 21.429V7.714c0-1.423 1.173-2.571 2.625-2.571h15.75v-.857z"
        fill={white}
      />
    </svg>
  );
};

export default Jobs;
