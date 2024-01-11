import ReactCountryFlag from 'react-country-flag';

export const Flag = ({ countryCode }: { countryCode: string }) => {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '32px',
        height: '17px',
      }}
    />
  );
};
