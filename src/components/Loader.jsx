import { RotatingLines } from 'react-loader-spinner';

export function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
        duration
      />
    </div>
  );
}
