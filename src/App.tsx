import './App.css';
import Avatar from './components/Avatar';

function App() {
  return (
    <section className="grid w-full h-screen grid-cols-[0.3fr_2fr_7fr]">
      <div className="border-r-[1px] border-neutral-700">
        <div className="py-4 flex justify-center items-center w-full border-b-[1px] border-neutral-700">
          <Avatar />
        </div>
        <div className="py-4 flex justify-center items-center w-full border-b-[1px] border-neutral-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-settings-icon lucide-settings"
          >
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>
      <div className="border-r-[1px] border-neutral-700">
        <div className="px-6 py-5 border-b-[1px] border-neutral-700">
          Sttackked
        </div>
        <div className="border-b-[1px] border-neutral-700 py-6 px-6">foo</div>
      </div>
      <div>foo</div>
    </section>
  );
}

export default App;
