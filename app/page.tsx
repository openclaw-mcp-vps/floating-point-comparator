export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-[#161b22] border border-[#30363d] rounded-full px-4 py-1 text-xs text-[#58a6ff] mb-6">
          Developer Tool
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Stop Getting Burned by{" "}
          <span className="text-[#58a6ff]">Floating Point</span> Bugs
        </h1>
        <p className="text-[#8b949e] text-lg mb-8 max-w-xl mx-auto">
          Interactive playground to safely compare floats, generate correct comparison code in multiple languages, and never ship <code className="text-[#58a6ff]">0.1 + 0.2 === 0.3</code> bugs again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || "#"}
            className="bg-[#58a6ff] text-[#0d1117] font-bold px-8 py-3 rounded-lg hover:bg-[#79b8ff] transition-colors"
          >
            Get Pro — $5/mo
          </a>
          <a
            href="#faq"
            className="border border-[#30363d] text-[#c9d1d9] px-8 py-3 rounded-lg hover:border-[#58a6ff] transition-colors"
          >
            Learn More
          </a>
        </div>
        <div className="mt-12 bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-left">
          <div className="text-xs text-[#8b949e] mb-3">// Playground preview</div>
          <div className="space-y-2 text-sm">
            <div><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">a</span> = <span className="text-[#a5d6ff]">0.1</span> + <span className="text-[#a5d6ff]">0.2</span>;</div>
            <div><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">b</span> = <span className="text-[#a5d6ff]">0.3</span>;</div>
            <div className="text-[#8b949e]">// ❌ Unsafe: a === b → false</div>
            <div className="text-[#8b949e]">// ✅ Safe: Math.abs(a - b) &lt; Number.EPSILON → true</div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="max-w-3xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "⚡", title: "Instant Comparison", desc: "Test float comparisons with epsilon, ULP, and relative tolerance methods." },
          { icon: "📋", title: "Code Generation", desc: "Get correct snippets in JS, Python, Rust, Go, C++, and more." },
          { icon: "🔁", title: "Batch Processing", desc: "Upload CSV data and validate thousands of comparisons at once. Pro only." }
        ].map((f) => (
          <div key={f.title} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-bold text-white text-sm mb-1">{f.title}</div>
            <div className="text-[#8b949e] text-xs">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section className="max-w-sm mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Simple Pricing</h2>
        <div className="bg-[#161b22] border border-[#58a6ff] rounded-xl p-8 text-center">
          <div className="text-[#58a6ff] text-sm font-bold uppercase tracking-widest mb-2">Pro</div>
          <div className="text-5xl font-bold text-white mb-1">$5</div>
          <div className="text-[#8b949e] text-sm mb-6">per month</div>
          <ul className="text-left space-y-3 mb-8 text-sm">
            {[
              "Unlimited comparisons",
              "Code generation (8 languages)",
              "Batch CSV processing",
              "REST API access",
              "Priority support"
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#3fb950]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || "#"}
            className="block w-full bg-[#58a6ff] text-[#0d1117] font-bold py-3 rounded-lg hover:bg-[#79b8ff] transition-colors"
          >
            Start Free Trial
          </a>
          <p className="text-[#8b949e] text-xs mt-3">Cancel anytime. No credit card required for trial.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Why can't I just use === for floats?",
              a: "IEEE 754 floating-point arithmetic introduces rounding errors. 0.1 + 0.2 evaluates to 0.30000000000000004, not 0.3. Direct equality checks fail unpredictably."
            },
            {
              q: "What comparison methods does FloatSafe support?",
              a: "Absolute epsilon, relative epsilon, ULP (units in the last place) distance, and combined tolerance strategies — each suited for different use cases."
            },
            {
              q: "Which languages can I generate code for?",
              a: "JavaScript, TypeScript, Python, Rust, Go, C, C++, and Java. Pro subscribers get all languages plus custom epsilon configuration."
            }
          ].map((item) => (
            <div key={item.q} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
              <div className="font-bold text-white text-sm mb-2">{item.q}</div>
              <div className="text-[#8b949e] text-sm">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#30363d] text-center py-6 text-[#8b949e] text-xs">
        © {new Date().getFullYear()} FloatSafe. Built for developers who care about correctness.
      </footer>
    </main>
  );
}
