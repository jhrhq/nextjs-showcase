const SearchMessage = () => {
  return (
    <main className="container mx-auto px-4 pt-24 pb-8 bg-gray-900 min-h-screen">
      <div className="flex items-center  px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Please input a movie name in the search bar
            </h1>
            <p className="text-gray-400">Eg: &quot;John Wick&quot; </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchMessage;
