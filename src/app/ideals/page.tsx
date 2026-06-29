"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PrincipleSection = {
  title: string;
  principles: string[];
};

const PRINCIPLE_SECTIONS: PrincipleSection[] = [
  {
    title: "Fundamental Techniques in Handling People",
    principles: [
      "Don’t criticize, condemn or complain.",
      "Give honest and sincere appreciation.",
      "Arouse in the other person an eager want.",
    ],
  },
  {
    title: "Six Ways to Make People Like You",
    principles: [
      "Become genuinely interested in other people.",
      "Smile.",
      "Remember that a person’s name is to that person the sweetest and most important sound in any language.",
      "Be a good listener. Encourage others to talk about themselves.",
      "Talk in terms of the other person’s interests.",
      "Make the other person feel important — and do it sincerely.",
    ],
  },
  {
    title: "Win People to Your Way of Thinking",
    principles: [
      "The only way to get the best of an argument is to avoid it.",
      "Show respect for the other person’s opinions. Never say, “You’re wrong.”",
      "If you are wrong, admit it quickly and emphatically.",
      "Begin in a friendly way.",
      "Get the other person saying “yes, yes” immediately.",
      "Let the other person do a great deal of the talking.",
      "Let the other person feel that the idea is his or hers.",
      "Try honestly to see things from the other person’s point of view.",
      "Be sympathetic with the other person’s ideas and desires.",
      "Appeal to the nobler motives.",
      "Dramatize your ideas.",
      "Throw down a challenge.",
    ],
  },
  {
    title: "Be a Leader",
    principles: [
      "Begin with praise and honest appreciation.",
      "Call attention to people’s mistakes indirectly.",
      "Talk about your own mistakes before criticizing the other person.",
      "Ask questions instead of giving direct orders.",
      "Let the other person save face.",
      "Praise the slightest improvement and praise every improvement. Be “hearty in your approbation and lavish in your praise.”",
      "Give the other person a fine reputation to live up to.",
      "Use encouragement. Make the fault seem easy to correct.",
      "Make the other person happy about doing the thing you suggest.",
    ],
  },
  {
    title: "On Power and Authority",
    principles: [
      "It is better to be feared than loved, if you cannot be both.",
      "A ruler must avoid being hated above all else.",
      "Power is maintained through strength, not goodwill alone.",
      "People are quick to forget kindness but never forget fear.",
      "A prince must always appear strong and in control.",
    ],
  },
  {
    title: "On Human Nature",
    principles: [
      "Men are ungrateful, fickle, false, cowardly, and greedy.",
      "People will support you while it benefits them.",
      "Loyalty is conditional and often temporary.",
      "Most people judge by appearances rather than reality.",
      "He who trusts everyone will be deceived.",
    ],
  },
  {
    title: "On Strategy and Decision Making",
    principles: [
      "A prince must learn how not to be good when necessary.",
      "Adapt to changing circumstances or risk failure.",
      "Fortune favors the bold, not the cautious.",
      "Indecision is more dangerous than making the wrong choice.",
      "A wise ruler anticipates problems before they arise.",
    ],
  },
  {
    title: "On Leadership and Control",
    principles: [
      "Maintain control through clear structure and authority.",
      "Reward and punish decisively and without hesitation.",
      "Delegating blame and keeping credit strengthens leadership.",
      "Avoid empowering those who may become threats.",
      "Control the narrative around your rule.",
    ],
  },
  {
    title: "On Appearances and Reputation",
    principles: [
      "It is not necessary to be virtuous, but it is essential to appear so.",
      "People judge more by what they see than what is true.",
      "A ruler should appear merciful, faithful, humane, and religious.",
      "Reputation is a tool for maintaining power.",
      "Deception, when used carefully, is a political instrument.",
    ],
  },
  {
    title: "On War and Military",
    principles: [
      "A prince must have no objective other than war and its discipline.",
      "Mercenaries and auxiliaries are unreliable and dangerous.",
      "Strong armies are the foundation of stable rule.",
      "Peace is only a preparation for war.",
      "A ruler who neglects military matters loses power.",
    ],
  },
  {
    title: "On Stability and Survival",
    principles: [
      "Crush threats completely; do not leave room for retaliation.",
      "New rulers must eliminate former power structures.",
      "People accept change if their lives improve or remain stable.",
      "Control over institutions ensures long-term power.",
      "Survival often requires actions that conflict with morality.",
    ],
  },
  {
    title: "Self-Image",
    principles: [
      "Your self-image determines your behavior and outcomes.",
      "You cannot outperform your internal identity for long.",
      "Change the self-image first; results follow automatically.",
      "The mind acts consistently with how you see yourself.",
      "Self-acceptance is the foundation of all improvement.",
    ],
  },
  {
    title: "The Success Mechanism",
    principles: [
      "The brain operates as a goal-seeking mechanism.",
      "Clear goals activate subconscious problem-solving.",
      "You do not need all answers upfront; direction is sufficient.",
      "Trust the process once the target is defined.",
      "Feedback, not perfection, drives progress.",
    ],
  },
  {
    title: "Imagination and Mental Rehearsal",
    principles: [
      "The mind cannot clearly distinguish between real and vividly imagined experiences.",
      "Mental rehearsal builds familiarity and confidence.",
      "Repeated visualization conditions expected outcomes.",
      "Acting 'as if' rewires internal belief systems.",
      "Imagination sets the blueprint for behavior.",
    ],
  },
  {
    title: "Failure and Learning",
    principles: [
      "Failure is feedback, not identity.",
      "Mistakes are data for course correction.",
      "Avoid emotional overreaction to setbacks.",
      "Detach self-worth from temporary outcomes.",
      "Success is built through iterative adjustment.",
    ],
  },
  {
    title: "Rational Thinking",
    principles: [
      "Use reason to challenge negative assumptions.",
      "Separate facts from interpretations.",
      "Most fears are exaggerated or imagined.",
      "Objective thinking reduces emotional distortion.",
      "Clarity comes from questioning automatic thoughts.",
    ],
  },
  {
    title: "Relaxation and Control",
    principles: [
      "Tension blocks effective performance.",
      "Relaxation improves accuracy and response.",
      "Over-effort often reduces results.",
      "Calm focus outperforms forced intensity.",
      "Control comes from reducing internal resistance.",
    ],
  },
  {
    title: "Habit and Conditioning",
    principles: [
      "Behavior is shaped through repetition.",
      "New habits require consistent reinforcement.",
      "Identity shifts through repeated action.",
      "Small wins accumulate into lasting change.",
      "Consistency matters more than intensity.",
    ],
  },
  {
    title: "Confidence and Action",
    principles: [
      "Confidence is built through action, not waiting.",
      "Take action before you feel fully ready.",
      "Momentum reduces fear.",
      "Acting despite doubt strengthens belief.",
      "Courage grows through repeated exposure.",
    ],
  },
  {
    title: "Emotional Control",
    principles: [
      "You can choose responses to external events.",
      "Emotions follow interpretation, not reality itself.",
      "Pause before reacting.",
      "Reframe situations to regain control.",
      "Stability is a trained skill.",
    ],
  },
  {
    title: "Purpose and Direction",
    principles: [
      "A clear direction organizes behavior.",
      "Meaningful goals sustain long-term effort.",
      "Drifting leads to inconsistency and frustration.",
      "Purpose aligns conscious and subconscious processes.",
      "Direction reduces internal conflict.",
    ],
  },
  {
    title: "See Through People's Masks",
    principles: [
      "People rarely reveal their true motives directly.",
      "Observe actions more than words.",
      "Patterns reveal character better than promises.",
      "Emotions often expose hidden intentions.",
      "What people consistently avoid discussing can be as revealing as what they share.",
    ],
  },
  {
    title: "Master Self-Control",
    principles: [
      "Your emotional reactions are often your greatest vulnerability.",
      "Pause before responding to provocation.",
      "Distance creates clarity.",
      "Never let temporary emotions dictate permanent decisions.",
      "The person with greater emotional control usually has greater power.",
    ],
  },
  {
    title: "Understand Narcissism",
    principles: [
      "Everyone possesses narcissistic tendencies to some degree.",
      "People are primarily focused on themselves.",
      "Empathy provides insight into others' motivations.",
      "The desire for validation drives much human behavior.",
      "Appeal to people's self-interest before appealing to logic.",
    ],
  },
  {
    title: "Read Character",
    principles: [
      "Character reveals itself under pressure.",
      "Observe how people treat those who cannot benefit them.",
      "Past behavior is the strongest predictor of future behavior.",
      "Small actions often reveal large truths.",
      "Trust character over talent.",
    ],
  },
  {
    title: "Beware Envy",
    principles: [
      "Envy is often hidden behind criticism or indifference.",
      "Success can create enemies more quickly than failure.",
      "People rarely admit feeling envious.",
      "Avoid unnecessary displays of superiority.",
      "Recognize envy before it becomes sabotage.",
    ],
  },
  {
    title: "Influence Through Empathy",
    principles: [
      "Understand people's needs before attempting to persuade them.",
      "Listen for emotional motivations beneath rational explanations.",
      "People want to feel understood before they are willing to change.",
      "Perspective-taking is a strategic advantage.",
      "Influence begins with understanding.",
    ],
  },
  {
    title: "See Group Dynamics Clearly",
    principles: [
      "Groups often amplify irrational behavior.",
      "People conform more than they realize.",
      "Crowds reduce individual responsibility.",
      "Question popular opinion before accepting it.",
      "Maintain independent judgment under social pressure.",
    ],
  },
  {
    title: "Recognize Aggression",
    principles: [
      "Aggression is frequently indirect rather than overt.",
      "Passive aggression can be more destructive than open conflict.",
      "Resentment grows when left unaddressed.",
      "Learn to identify disguised hostility.",
      "Do not confuse politeness with goodwill.",
    ],
  },
  {
    title: "Avoid Self-Sabotage",
    principles: [
      "People often create the problems they blame on circumstances.",
      "Your habits shape your destiny more than your intentions.",
      "Awareness precedes transformation.",
      "Identify recurring negative patterns in your life.",
      "Responsibility creates freedom.",
    ],
  },
  {
    title: "Develop Realistic Confidence",
    principles: [
      "Confidence should be built on competence.",
      "Overconfidence blinds people to risk.",
      "Humility improves learning.",
      "Accept limitations while pursuing growth.",
      "Reality is a stronger ally than ego.",
    ],
  },
  {
    title: "Become More Rational",
    principles: [
      "Emotion often masquerades as reason.",
      "Question your first interpretation of events.",
      "Seek evidence before forming conclusions.",
      "Bias affects everyone, including you.",
      "Rationality is a practice, not a trait.",
    ],
  },
  {
    title: "Understand Power",
    principles: [
      "Power exists in every human relationship.",
      "Influence often operates invisibly.",
      "People compete for status more than they admit.",
      "Control over yourself is the foundation of all power.",
      "The less desperate you appear, the stronger your position becomes.",
    ],
  },
  {
    title: "Accept Human Nature",
    principles: [
      "People are complex and contradictory.",
      "Expect flaws rather than perfection.",
      "Idealizing others leads to disappointment.",
      "Human behavior is driven by recurring patterns.",
      "Understanding human nature reduces unnecessary conflict.",
    ],
  },
  {
    title: "Cultivate Purpose",
    principles: [
      "Purpose provides resistance against distraction.",
      "Meaning organizes effort and attention.",
      "People without direction become reactive.",
      "Long-term vision improves short-term decisions.",
      "A compelling purpose strengthens resilience.",
    ],
  },
  {
    title: "Transform Yourself",
    principles: [
      "Self-awareness is the beginning of mastery.",
      "Observe yourself as objectively as you observe others.",
      "Growth requires confronting uncomfortable truths.",
      "Continual refinement is a lifelong process.",
      "Mastering human nature begins with mastering your own.",
    ],
  },
  {
    title: "System 1 and System 2",
    principles: [
      "System 1 is fast, automatic, and intuitive.",
      "System 2 is slow, deliberate, and analytical.",
      "Use System 2 for important decisions.",
      "Do not assume your first intuition is correct.",
      "Recognize when careful thinking is required.",
    ],
  },
  {
    title: "Cognitive Ease",
    principles: [
      "The mind prefers information that feels familiar.",
      "Ease of processing is often mistaken for truth.",
      "Repeated statements become more believable.",
      "Clarity improves persuasion but not necessarily accuracy.",
      "Question conclusions that feel 'obviously correct.'",
    ],
  },
  {
    title: "Overconfidence",
    principles: [
      "People consistently overestimate their knowledge.",
      "Confidence is not a reliable indicator of accuracy.",
      "Successful outcomes often involve luck.",
      "Humility leads to better judgment.",
      "Always consider what you might be missing.",
    ],
  },
  {
    title: "Anchoring",
    principles: [
      "Initial information strongly influences later judgments.",
      "First numbers become unconscious reference points.",
      "Evaluate estimates independently of the anchor.",
      "Be cautious when negotiating from another person's starting point.",
      "Question whether the initial value deserves influence.",
    ],
  },
  {
    title: "Availability Bias",
    principles: [
      "Events that are easier to recall appear more common.",
      "Recent experiences distort perceived probability.",
      "Emotional memories outweigh statistical evidence.",
      "Seek objective data before estimating risk.",
      "Do not confuse memorable with frequent.",
    ],
  },
  {
    title: "Confirmation Bias",
    principles: [
      "People naturally seek evidence supporting existing beliefs.",
      "Actively search for information that disproves your assumptions.",
      "Strong opinions require stronger evidence.",
      "Question conclusions you want to be true.",
      "Good judgment requires intellectual honesty.",
    ],
  },
  {
    title: "Loss Aversion",
    principles: [
      "Losses feel stronger than equivalent gains.",
      "Fear of losing often drives poor decisions.",
      "Evaluate choices by expected outcomes rather than emotion.",
      "Separate sunk costs from future value.",
      "Avoid protecting past investments at the expense of better opportunities.",
    ],
  },
  {
    title: "Prospect Theory",
    principles: [
      "People evaluate outcomes relative to a reference point.",
      "Risk preferences change depending on perceived gains or losses.",
      "People become risk-seeking when trying to avoid losses.",
      "Framing changes decisions without changing facts.",
      "Focus on objective value rather than presentation.",
    ],
  },
  {
    title: "The Planning Fallacy",
    principles: [
      "Projects almost always take longer than expected.",
      "Optimism causes systematic underestimation.",
      "Use historical evidence instead of intuition.",
      "Estimate based on comparable past projects.",
      "Include generous margins for uncertainty.",
    ],
  },
  {
    title: "The Halo Effect",
    principles: [
      "One positive trait influences unrelated judgments.",
      "Separate individual qualities during evaluation.",
      "Judge competence independently from likability.",
      "Avoid letting first impressions dominate decisions.",
      "Evaluate evidence attribute by attribute.",
    ],
  },
  {
    title: "Regression to the Mean",
    principles: [
      "Extreme outcomes naturally tend toward average over time.",
      "Do not mistake randomness for lasting improvement or decline.",
      "Exceptional performance is difficult to sustain.",
      "Look for long-term patterns instead of isolated events.",
      "Expect variation before assuming causation.",
    ],
  },
  {
    title: "Base Rates",
    principles: [
      "General statistical information often outperforms intuition.",
      "Consider population data before individual stories.",
      "Do not ignore probabilities when making predictions.",
      "Extra details do not necessarily improve forecasts.",
      "Use historical frequencies whenever possible.",
    ],
  },
  {
    title: "The Outside View",
    principles: [
      "Estimate outcomes using similar past situations.",
      "Avoid relying solely on your unique circumstances.",
      "Reference classes improve forecasting.",
      "Historical evidence beats optimistic planning.",
      "The outside view reduces overconfidence.",
    ],
  },
  {
    title: "Noise in Judgment",
    principles: [
      "Different people produce different judgments from the same information.",
      "Consistency is as important as accuracy.",
      "Reduce unnecessary variability in decision-making.",
      "Use structured processes instead of intuition alone.",
      "Standardization improves reliability.",
    ],
  },
  {
    title: "Decision Making",
    principles: [
      "Slow down when decisions have lasting consequences.",
      "Separate emotion from analysis whenever possible.",
      "Seek multiple independent perspectives.",
      "Accept uncertainty instead of forcing confidence.",
      "Good decisions do not always produce good outcomes, and bad outcomes do not always imply bad decisions.",
    ],
  },
];

export default function CarnegiePrinciples() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatedBackground />

      <section className="relative z-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-6 md:py-16">
          <header className="mx-auto w-full max-w-4xl">
            <Card className="border-white/40 bg-white/30 shadow-2xl backdrop-blur-2xl">
              <CardContent className="px-6 py-8 md:px-10 md:py-10">
                <div className="flex flex-col gap-4 text-center"></div>
              </CardContent>
            </Card>
          </header>

          <section className="flex flex-col gap-4 max-w-3xl mx-auto">
            {PRINCIPLE_SECTIONS.map((section) => (
              <article key={section.title} className="h-full w-full mx-auto">
                <Card className="h-full border-white/40 bg-white/30 shadow-2xl backdrop-blur-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                      {section.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ol className="space-y-3">
                      {section.principles.map((principle, index) => (
                        <li
                          key={`${section.title}-${index + 1}`}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-4 backdrop-blur-xl"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-foreground">
                            {index + 1}
                          </div>

                          <p className="pt-0.5 text-sm leading-7 text-foreground/95 md:text-base">
                            {principle}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}

function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0">
        <div className="blob blob-1 fixed left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500 blur-[110px] md:h-[34rem] md:w-[34rem]" />
        <div className="blob blob-2 fixed right-[-8rem] top-[8%] h-[22rem] w-[22rem] rounded-full bg-orange-400 blur-[110px] md:h-[30rem] md:w-[30rem]" />
        <div className="blob blob-3 fixed left-[8%] top-[38%] h-[18rem] w-[18rem] rounded-full bg-violet-500 blur-[110px] md:h-[26rem] md:w-[26rem]" />
        <div className="blob blob-4 fixed right-[10%] top-[45%] h-[20rem] w-[20rem] rounded-full bg-pink-500 blur-[120px] md:h-[28rem] md:w-[28rem]" />
        <div className="blob blob-5 fixed bottom-[-8rem] left-[18%] h-[22rem] w-[22rem] rounded-full bg-cyan-400 blur-[120px] md:h-[30rem] md:w-[30rem]" />
        <div className="blob blob-6 fixed bottom-[-8rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-amber-300 blur-[120px] md:h-[32rem] md:w-[32rem]" />
        <div className="fixed inset-0 bg-black/15" />
        <div className="fixed inset-0 backdrop-blur-[60px]" />
        <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,16,0.72),rgba(8,8,12,0.82))]" />
      </div>
    </>
  );
}
