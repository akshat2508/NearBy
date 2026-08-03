import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import Spinner from "@/components/ui/Spinner";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

const STATS = [
  { value: "12K+", label: "Nearby Users" },
  { value: "4.9★", label: "Average Rating" },
  { value: "250K+", label: "Connections" },
  { value: "98%", label: "Positive Matches" },
];

const FEATURES = [
  {
    title: "Real Time Discovery",
    description:
      "People appear the moment they enter your selected radius.",
    icon: RadarIcon,
  },
  {
    title: "Privacy First",
    description:
      "Only your radius is shared. Your exact location never leaves your device.",
    icon: ShieldIcon,
  },
  {
    title: "Shared Interests",
    description:
      "Connect through hobbies, professions and communities before chatting.",
    icon: SparkIcon,
  },
  {
    title: "Smart Matching",
    description:
      "Distance, activity and common interests create meaningful suggestions.",
    icon: PulseIcon,
  },
];

const PEOPLE = [
  {
    name: "Emma",
    distance: "120m",
    interest: "Photography",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "Alex",
    distance: "480m",
    interest: "Cycling",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Ryan",
    distance: "850m",
    interest: "Coffee",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Sophia",
    distance: "1.2km",
    interest: "UI Design",
    color: "from-violet-400 to-purple-500",
  },
];


const PEOPLE2 = [
  {
    name: "Emma",
    distance: "120m",
    interest: "Photography",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "Alex",
    distance: "480m",
    interest: "Cycling",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Ryan",
    distance: "850m",
    interest: "Coffee",
    color: "from-amber-400 to-orange-500",
  },

];

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    quote:
      "I met two developers living three streets away. We've built two projects together already.",
  },
  {
    name: "Priya Sharma",
    role: "Designer",
    quote:
      "This feels more natural than social media. You're discovering real people around you.",
  },
  {
    name: "Ananya",
    role: "Photographer",
    quote:
      "Found a weekend photography group within 800 meters. Couldn't believe it.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   ICONS                                    */
/* -------------------------------------------------------------------------- */

function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 21s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ShieldIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9c-3.5-1.5-7-4-7-9V6l7-3z" />
    </svg>
  );
}

function PulseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M3 12h4l2-6l4 12l2-6h6" />
    </svg>
  );
}

function SparkIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5.5 5.5l3 3M15.5 15.5l3 3M18.5 5.5l-3 3M8.5 15.5l-3 3" />
    </svg>
  );
}

function RadarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12L18 8" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PREMIUM BACKGROUND                              */
/* -------------------------------------------------------------------------- */

function BackgroundEffects() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-emerald-500/15 blur-[120px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.2),transparent_50%)]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                             FLOATING PEOPLE                                */
/* -------------------------------------------------------------------------- */

function FloatingCard({ person, className }) {
  return (
    <div
      className={`absolute rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-2xl p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-12 w-12 rounded-full bg-gradient-to-br ${person.color}`}
        />

        <div>
          <h4 className="font-semibold text-gray-900">{person.name}</h4>

          <p className="text-xs text-gray-500">{person.interest}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-emerald-600 font-semibold">
          {person.distance}
        </span>

        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
          ONLINE
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  RADAR                                     */
/* -------------------------------------------------------------------------- */

function PremiumRadar() {
  const dots = [
    { top: "18%", left: "60%" },
    { top: "32%", left: "18%" },
    { top: "62%", left: "25%" },
    { top: "68%", left: "70%" },
    { top: "42%", left: "78%" },
  ];

  return (
    <div className="relative flex h-[500px] w-[500px] items-center justify-center">

      {[420,320,220,120].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-emerald-300/40"
          style={{
            width: size,
            height: size,
          }}
        />
      ))}

      <div className="absolute h-[420px] w-[420px] animate-ping rounded-full bg-emerald-500/10 duration-[3000ms]" />

      <div className="relative z-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-[0_0_80px_rgba(16,185,129,.5)]">
        <PinIcon className="h-8 w-8 text-white" />
      </div>

      {dots.map((dot, index) => (
        <span
          key={index}
          style={dot}
          className="absolute h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,.9)] animate-pulse"
        />
      ))}

      <FloatingCard
        className="-left-8 top-10 animate-bounce"
        person={PEOPLE[0]}
      />

      <FloatingCard
        className="-right-10 top-24"
        person={PEOPLE[1]}
      />

      <FloatingCard
        className="bottom-10 -left-4"
        person={PEOPLE[2]}
      />

      <FloatingCard
        className="bottom-0 -right-8"
        person={PEOPLE[3]}
      />
    </div>
  );
}

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();

  const [onlineUsers, setOnlineUsers] = useState(12438);

  useEffect(() => {
    const id = setInterval(() => {
      setOnlineUsers((v) =>
        v + (Math.random() > 0.5 ? 1 : -1)
      );
    }, 2500);

    return () => clearInterval(id);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="relative overflow-hidden bg-white text-gray-900">

      <BackgroundEffects />

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/20 bg-white/60">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">

              <PinIcon className="h-5 w-5"/>

            </div>

            <div>

              <h2 className="text-lg font-bold">
                Nearby
              </h2>

              <p className="text-xs text-gray-500">
                Meet people around you
              </p>

            </div>

          </div>

          <nav className="hidden items-center gap-10 md:flex">

            <a href="#features" className="transition hover:text-emerald-600">
              Features
            </a>

            <a href="#how" className="transition hover:text-emerald-600">
              How it Works
            </a>

            <a href="#stories" className="transition hover:text-emerald-600">
              Stories
            </a>

            <a href="#faq" className="transition hover:text-emerald-600">
              FAQ
            </a>

          </nav>

          <GoogleSignInButton className="px-5 py-2"/>

        </div>

      </header>

      {/* HERO */}

      <section className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">

        <div>

          {/* LIVE BADGE */}

          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-xl">

            <span className="relative flex h-3 w-3">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"/>

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"/>

            </span>

            <span className="text-sm font-semibold">

              {onlineUsers.toLocaleString()} people online nearby

            </span>

          </div>

          <h1 className="mt-8 text-6xl font-black leading-[1.05] tracking-tight">

            Meet the
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}people around{" "}
            </span>
            you.

          </h1>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-gray-600">

            Forget endless swiping.

            Nearby connects you with real people that are actually
            around you right now based on distance, interests,
            and availability.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <GoogleSignInButton className="px-8 py-4 text-lg"/>

            <button className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-semibold shadow-lg transition hover:-translate-y-1">

              Learn More

            </button>

          </div>

          {/* TRUST */}

          <div className="mt-12 flex flex-wrap gap-8">

            <div>

              <h3 className="text-3xl font-bold">

                12K+

              </h3>

              <p className="text-gray-500">

                Active Users

              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold">

                98%

              </h3>

              <p className="text-gray-500">

                Positive Matches

              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold">

                4.9★

              </h3>

              <p className="text-gray-500">

                User Rating

              </p>

            </div>

          </div>

          {/* AVATARS */}

          <div className="mt-10 flex items-center gap-4">

            <div className="flex -space-x-4">

              {["A","E","P","R","S"].map((v,index)=>(
                <div
                  key={index}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-400 to-green-600 font-bold text-white shadow-xl"
                >
                  {v}
                </div>
              ))}

            </div>

            <div>

              <h4 className="font-semibold">

                Trusted by thousands

              </h4>

              <p className="text-sm text-gray-500">

                Join a growing community discovering genuine local connections.

              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="relative flex justify-center">

          <PremiumRadar/>

          {/* FLOATING BADGE */}

          <div className="absolute left-4 top-0 rounded-3xl border border-white/40 bg-white/70 p-5 shadow-2xl backdrop-blur-xl">

            <p className="text-sm text-gray-500">

              Average Match Time

            </p>

            <h3 className="mt-1 text-3xl font-black">

              4 min

            </h3>

          </div>

          <div className="absolute bottom-0 right-0 rounded-3xl border border-white/40 bg-white/70 p-5 shadow-2xl backdrop-blur-xl">

            <p className="text-sm text-gray-500">

              Connections Today

            </p>

            <h3 className="mt-1 text-3xl font-black">

              +842

            </h3>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="grid gap-8 rounded-[40px] border border-white/40 bg-white/70 p-10 shadow-2xl backdrop-blur-xl md:grid-cols-4">

          {STATS.map((item)=>(
            <div key={item.label}>

              <h3 className="text-5xl font-black text-emerald-600">

                {item.value}

              </h3>

              <p className="mt-3 text-gray-500">

                {item.label}

              </p>

            </div>
          ))}

        </div>

      </section>

            {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="relative mx-auto max-w-7xl px-6 py-28"
      >
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Everything you need
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight">

            Built for
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}real world connections
            </span>

          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">

            Every feature is designed to help you discover,
            connect and build meaningful friendships nearby.

          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {FEATURES.map((feature,index)=>{

            const Icon=feature.icon;

            return(

              <div
                key={feature.title}
                className={`group rounded-[32px] border border-gray-200 bg-white p-8 shadow-xl transition duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                  index===0 ? "lg:col-span-2":""
                }`}
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">

                  <Icon className="h-8 w-8"/>

                </div>

                <h3 className="mt-8 text-2xl font-bold">

                  {feature.title}

                </h3>

                <p className="mt-4 text-gray-600 leading-8">

                  {feature.description}

                </p>

                <div className="mt-8 h-2 rounded-full bg-gray-100">

                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"/>

                </div>

              </div>

            )

          })}

        </div>

      </section>

      {/* ================= APP PREVIEW ================= */}

      <section className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          <div>

            <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">

              Live Experience

            </span>

            <h2 className="mt-6 text-5xl font-black">

              Everything happens

              <br/>

              in real time.

            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              Nearby instantly updates who is around you.
              As people move, your discovery feed changes,
              keeping every connection fresh and relevant.

            </p>

            <div className="mt-10 space-y-6">

              {[
                "Real-time distance updates",
                "Instant online status",
                "Interest based discovery",
                "Secure private location"
              ].map(item=>(

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">

                    ✓

                  </div>

                  <p className="font-medium">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* PHONE */}

          <div className="flex justify-center">

            <div className="relative h-[700px] w-[350px] rounded-[48px] border-[12px] border-gray-900 bg-black shadow-[0_60px_120px_rgba(0,0,0,.25)]">

              <div className="absolute left-1/2 top-4 h-6 w-36 -translate-x-1/2 rounded-full bg-gray-900"/>

              <div className="h-full rounded-[36px] bg-gradient-to-b from-white to-gray-100 p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold">

                    Nearby

                  </h3>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">

                    LIVE

                  </span>

                </div>

                <div className="mt-8 space-y-5">

                  {PEOPLE2.map((person)=>(
                    <div
                      key={person.name}
                      className="rounded-3xl bg-white p-5 shadow-lg"
                    >

                      <div className="flex items-center gap-4">

                        <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${person.color}`}/>

                        <div className="flex-1">

                          <h4 className="font-bold">

                            {person.name}

                          </h4>

                          <p className="text-sm text-gray-500">

                            {person.interest}

                          </p>

                        </div>

                        <span className="text-sm font-bold text-emerald-600">

                          {person.distance}

                        </span>

                      </div>

                      <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition hover:scale-[1.02]">

                        Connect

                      </button>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how"
        className="mx-auto max-w-7xl px-6 py-28"
      >

        <div className="text-center">

          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">

            How It Works

          </span>

          <h2 className="mt-6 text-5xl font-black">

            Three simple steps

          </h2>

        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3">

          {[
            {
              number:"01",
              title:"Choose Radius",
              text:"Select how far you want to discover people."
            },
            {
              number:"02",
              title:"Discover Nearby",
              text:"See people currently around you with shared interests."
            },
            {
              number:"03",
              title:"Start Connecting",
              text:"Send requests and begin meaningful conversations."
            }
          ].map(step=>(

            <div
              key={step.number}
              className="relative rounded-[36px] bg-white p-10 shadow-xl transition hover:-translate-y-3"
            >

              <span className="text-6xl font-black text-emerald-100">

                {step.number}

              </span>

              <h3 className="mt-8 text-2xl font-bold">

                {step.title}

              </h3>

              <p className="mt-5 leading-8 text-gray-600">

                {step.text}

              </p>

            </div>

          ))}

        </div>

      </section>
            {/* ================= TESTIMONIALS ================= */}

      <section
        id="stories"
        className="mx-auto max-w-7xl px-6 py-28"
      >
        <div className="text-center">

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            Loved by Early Users
          </span>

          <h2 className="mt-6 text-5xl font-black">

            Real stories.
            <br />
            Real friendships.

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Thousands of people are already finding roommates,
            gym partners, photographers, developers and new
            friends around them.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {TESTIMONIALS.map((item,index)=>(
            <div
              key={index}
              className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-xl transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >

              <div className="mb-8 flex">

                {[1,2,3,4,5].map((i)=>(
                  <svg
                    key={i}
                    className="mr-1 h-5 w-5 fill-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 1l2.5 5 5.5.8-4 3.9.9 5.5L10 13.8 5.1 16.2l.9-5.5L2 6.8 7.5 6z"/>
                  </svg>
                ))}

              </div>

              <p className="text-lg leading-8 text-gray-600">

                "{item.quote}"

              </p>

              <div className="mt-10 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-xl font-bold text-white">

                  {item.name[0]}

                </div>

                <div>

                  <h4 className="font-bold">

                    {item.name}

                  </h4>

                  <p className="text-sm text-gray-500">

                    {item.role}

                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section
        id="faq"
        className="mx-auto max-w-5xl px-6 py-28"
      >

        <div className="text-center">

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

            Frequently Asked

          </span>

          <h2 className="mt-6 text-5xl font-black">

            Questions?

          </h2>

        </div>

        <div className="mt-16 space-y-6">

          {[
            [
              "Is my exact location shared?",
              "Never. Nearby only shares an approximate discovery radius."
            ],
            [
              "Can I hide myself?",
              "Yes. You can become invisible anytime from your profile."
            ],
            [
              "Can anyone message me?",
              "No. Both users must connect before messaging."
            ],
            [
              "Can I change my radius?",
              "Yes. Increase or decrease it whenever you want."
            ]
          ].map(([q,a])=>(

            <details
              key={q}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
            >

              <summary className="cursor-pointer list-none text-xl font-bold">

                {q}

              </summary>

              <p className="mt-6 leading-8 text-gray-600">

                {a}

              </p>

            </details>

          ))}

        </div>

      </section>

      {/* ================= BIG CTA ================= */}

      <section className="mx-auto max-w-7xl px-6 py-32">

        <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-r from-emerald-600 via-green-500 to-cyan-500 p-20 text-center text-white shadow-[0_40px_120px_rgba(16,185,129,.35)]">

          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"/>

          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"/>

          <div className="relative z-10">

            <h2 className="text-6xl font-black">

              Meet someone amazing

              <br/>

              today.

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-white/90">

              Stop scrolling endlessly.

              Start discovering real people around you.

            </p>

            <div className="mt-12">

              <GoogleSignInButton className="rounded-2xl px-10 py-5 text-lg text-black font-bold text-emerald-700 transition hover:scale-105"/>

            </div>

            <div className="mt-12 flex justify-center gap-10 text-sm">

              <span>✓ Free Forever</span>

              <span>✓ Privacy First</span>

              <span>✓ Instant Access</span>

            </div>

          </div>

        </div>

      </section>
            {/* ================= FOOTER ================= */}

      <footer className="relative border-t border-gray-200">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid gap-12 lg:grid-cols-5">

            {/* Brand */}

            <div className="lg:col-span-2">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-xl">

                  <PinIcon className="h-7 w-7"/>

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    Nearby

                  </h2>

                  <p className="text-gray-500">

                    Real people. Real places.

                  </p>

                </div>

              </div>

              <p className="mt-8 max-w-md leading-8 text-gray-600">

                Nearby helps people discover meaningful
                friendships, communities and opportunities
                around them.

                Designed with privacy at its core.

              </p>

              <div className="mt-10 flex gap-4">

                {["X","G","I","L"].map((letter)=>(
                  <button
                    key={letter}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition hover:-translate-y-1 hover:bg-emerald-500 hover:text-white"
                  >
                    {letter}
                  </button>
                ))}

              </div>

            </div>

            {/* Product */}

            <div>

              <h4 className="font-bold">

                Product

              </h4>

              <div className="mt-6 space-y-4">

                {[
                  "Features",
                  "Discover",
                  "Communities",
                  "Nearby Feed",
                  "Updates"
                ].map(item=>(
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-500 transition hover:text-emerald-600"
                  >
                    {item}
                  </a>
                ))}

              </div>

            </div>

            {/* Company */}

            <div>

              <h4 className="font-bold">

                Company

              </h4>

              <div className="mt-6 space-y-4">

                {[
                  "About",
                  "Blog",
                  "Careers",
                  "Press",
                  "Contact"
                ].map(item=>(
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-500 transition hover:text-emerald-600"
                  >
                    {item}
                  </a>
                ))}

              </div>

            </div>

            {/* Legal */}

            <div>

              <h4 className="font-bold">

                Legal

              </h4>

              <div className="mt-6 space-y-4">

                {[
                  "Privacy",
                  "Terms",
                  "Cookies",
                  "Security",
                  "Support"
                ].map(item=>(
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-500 transition hover:text-emerald-600"
                  >
                    {item}
                  </a>
                ))}

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-10 md:flex-row">

            <p className="text-gray-500">

              © {new Date().getFullYear()} Nearby.
              Crafted with ❤️ for meaningful local connections.

            </p>

            <div className="flex items-center gap-8 text-sm text-gray-500">

              <span>Privacy First</span>

              <span>End-to-End Secure</span>

              <span>Made with React</span>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}