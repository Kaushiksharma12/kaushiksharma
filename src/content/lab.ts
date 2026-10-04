export interface LabExperiment {
  id: string;
  sysId: string;
  title: string;
  status: "learning" | "logged" | "planned";
  category: string;
  date: string;
  summary: string;
  hypothesis: string;
  findingOrFailure: string;
  failureAnalysis?: string;
  learnings?: string[];
  codeSnippet?: string;
  handwrittenNote: string;
  tags: string[];
}

export type LabItem = LabExperiment;

export const labData: LabExperiment[] = [
  {
    id: "exp-01",
    sysId: "SYS-0101",
    title: "Minimax Tree Pruning & Alpha-Beta Heuristics in Board State Space",
    status: "logged",
    category: "Game AI & Heuristics",
    date: "2026-02",
    summary: "Evaluated state-space exploration depth in 2-player zero-sum deterministic board games (Tic-Tac-Toe & Connect 4) to balance evaluation response time vs depth accuracy on low-tier mobile devices.",
    hypothesis: "Full minimax search depth (9 layers in Tic-Tac-Toe) guarantees un-beatable play, but fixed depth bounds with heuristic score functions are required for deeper games like Connect 4.",
    findingOrFailure: "Failure on raw recursion without memoization: memory allocations spiked past 45MB on older mobile devices. Implemented state transposition maps to keep search latency <12ms.",
    handwrittenNote: "Recursion is clean until mobile memory limits hit. Transposition table saved it.",
    tags: ["Minimax", "Game AI", "Alpha-Beta", "State Space"]
  },
  {
    id: "exp-02",
    sysId: "SYS-0102",
    title: "Playwright Headless Browser Resiliency & Scraping Pipeline Anti-Detect",
    status: "logged",
    category: "Web Automation",
    date: "2026-01",
    summary: "Engineered automated data collection workflows extracting structured lead entries into MongoDB across complex web DOM layouts.",
    hypothesis: "Intermittent network timeouts and rate-limiting can be mitigated through exponential backoff policies and custom user-agent rotation.",
    findingOrFailure: "Hard DOM selector dependencies failed when targets rendered dynamic shadow DOMs. Switched to resilient CSS path fallback trees.",
    handwrittenNote: "Never trust a single CSS selector in production scraping!",
    tags: ["Playwright", "Puppeteer", "MongoDB", "Automation"]
  },
  {
    id: "exp-03",
    sysId: "SYS-0103",
    title: "n8n & Webhook Autonomous Lead Processing Pipeline",
    status: "learning",
    category: "Workflow Automation",
    date: "2026-02",
    summary: "Connecting automated browser leads to real-time notification endpoints and database indexing using n8n event triggers.",
    hypothesis: "Zero-code workflow nodes combined with custom Python transformation scripts reduce infrastructure overhead for lead validation.",
    findingOrFailure: "In progress. Evaluating payload validation throughput across 1,000+ continuous event hooks.",
    handwrittenNote: "Connecting the dots between scrapers and real-time dashboards.",
    tags: ["n8n", "REST APIs", "Automation", "Pipelines"]
  },
  {
    id: "exp-04",
    sysId: "SYS-0104",
    title: "On-Device Small Model Quantization & Local NLP Inference",
    status: "planned",
    category: "Model Optimization",
    date: "2026-03",
    summary: "Exploring GGUF quantization techniques to run lightweight sub-1B parameter models directly within browser web workers.",
    hypothesis: "WebAssembly + ONNX Runtime execution can deliver latency-sensitive text classification without round-tripping to API servers.",
    findingOrFailure: "Planned exploration target.",
    handwrittenNote: "Bringing AI inference closer to the client browser edge.",
    tags: ["Quantization", "ONNX", "Wasm", "Browser AI"]
  }
];
