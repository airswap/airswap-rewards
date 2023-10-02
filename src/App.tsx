import { Header } from "./features/structure/Header";
import { VoteList } from "./features/votes/VoteList";
import { useApplyTheme } from "./hooks/useApplyTheme";

function App() {
  useApplyTheme();

  return (
    <div className="flex flex-col flex-1 h-full">
      <Header />
      <main className="mx-auto flex w-[808px] p-2 max-w-full flex-col flex-1">
        <VoteList />
      </main>
    </div>
  );
}

export default App;
