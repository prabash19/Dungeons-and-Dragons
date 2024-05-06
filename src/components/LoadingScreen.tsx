const LoadingScreen = () => {
  return (
    <div className="mt-10 w-full h-full flex flex-col justify-center items-center bg-gray-100 z-[9999]">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-darkBlue rounded-full animate-spin"></div>
      <p className="mt-8 text-xl font-medium">Please Wait !!!!</p>
    </div>
  );
};

export default LoadingScreen;
