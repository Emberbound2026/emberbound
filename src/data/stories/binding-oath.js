// The Binding Oath — second title. Same { startNode, nodes } contract as
// ember-court.js; same diamond branch structure (proven to work: every
// choice screen has 2 real options, free through the "n3" tier, locked
// from "n4" onward, 4 endings gated by the same guarded/trust flag).

export const bindingOath = {
  startNode: "n1",
  nodes: {

    n1: {
      chapter: "One — The Ritual",
      text: `You'd been three heartbeats from freedom when he caught you — sword already drawn, dragon-marked eyes reflecting the wardlight of the tower you'd just finished robbing. Three heartbeats, and you'd have vanished into the dark with what you came for.

Instead, you're standing in the wreckage of a containment circle, his blade through the space where your chest used to be a moment ago, both of you staring down at your joined hands like they belong to someone else.

"What," he says, very carefully, "did you just do."

"Saved my own life, unless you'd like to try that again and find out what happens." Your voice comes out steadier than you feel. The binding-glyphs still glow faintly along your wrist, matching the ones now scored into his.

He tries to step back. Gets exactly as far as you'd expect — which is to say, not far at all, before something invisible snaps taut between you like a leash pulled to its limit.

"Explain," he says, "before I decide this was worth losing my sword arm over."

The spell wasn't supposed to do this. The spell was supposed to *repel* him, not chain the two of you together like a knot neither of you tied on purpose.`,
      choices: [
        { label: "Break away in fury — test how far you can go", next: "n2a" },
        { label: "Stay put and demand he explain what he was doing here", next: "n2b" }
      ]
    },

    n2a: {
      chapter: "Two — The Length of the Tether",
      text: `You turn and walk. It's petty, and satisfying, and lasts exactly nine steps before the tether snaps taut and yanks you backward off your feet.

He catches you. Of course he catches you — dragon-blooded reflexes, insultingly fast, one arm around your waist before you hit the stone floor.

"A mile," he says, setting you upright like you weigh nothing, like this isn't the single worst night of either of your lives. "Give or take. I felt it stop giving."

"Let go of me."

"With pleasure." He does, immediately, like your skin offends him. Steps back to the exact edge of what the tether allows and no further, testing it with the same clinical precision he'd probably use on a wound. "This is a containment binding. Old work — older than either of us. You didn't cast this by accident."

"I cast a *ward*. This is not what a ward does."

"Then someone rewrote it." His jaw tightens. "Or something about you resisted it hard enough to twist it into this instead."

Neither of you says what you're both thinking: that whatever this is, it isn't undoing itself by morning.`,
      choices: [
        { label: "Accept it's real — ask what happens now", next: "n3" },
        { label: "Demand to know why a knight was hunting a mage tower alone", next: "n3_pressed" }
      ]
    },

    n2b: {
      chapter: "Two — What You Broke",
      text: `You don't run. Running, you've learned, tends to go badly when someone else's magic is involved. Instead you stand your ground, arms crossed, doing your best impression of someone who isn't currently panicking.

"You first," you say. "Dragon-blood doesn't patrol mage towers for fun. What were you actually doing here?"

He studies you for a long moment — the kind of look that catalogues weapons, exits, and weaknesses all at once, old training that doesn't switch off just because his hand is currently tangled in an involuntary magical leash. "Hunting something that's been stealing from this tower for three months. I didn't expect it to be—" he gestures at you, vaguely, "—this."

"This meaning a mage. Shocking."

"This meaning someone who casts wards strong enough to nearly take my arm off and *still* got caught." Something almost like respect flickers behind the irritation. "That's not nothing."

"I'll treasure the compliment." You hold up your bound wrist, glyphs still faintly glowing. "Meanwhile."

"Meanwhile." He exhales, the sound of a man recalculating an entire evening. "We should probably not be standing in the ruins of a warded tower when the actual owners arrive."`,
      choices: [
        { label: "Accept it's real — ask what happens now", next: "n3" },
        { label: "Demand to know why a knight was hunting a mage tower alone", next: "n3_pressed" }
      ]
    },

    n3: {
      chapter: "Three — The Truth of It",
      text: `You find an abandoned grain store two streets over, defensible enough that neither of you can relax but private enough to actually think. He paces the length the tether allows — precisely half the room, over and over, like counting steps might change the answer.

"A binding this old doesn't break on its own," he says finally. "It has conditions. Terms. Old magic never just *stops* — it resolves."

"Resolves how?"

"That depends what triggered it." He stops pacing, finally, close enough that the tether goes slack between you for the first time since the tower. "Wards like this usually key to survival — cast in a moment someone genuinely believed they were about to die. Which means it thinks its job isn't done yet."

"Its job being."

"Keeping you alive." His eyes flick to the tether, then back to you, something unreadable crossing his face. "Possibly by keeping me close enough to make sure of it, given I was the immediate threat when it triggered."

"You're saying I accidentally recruited my own attacker as a bodyguard."

"I'm saying," he says, "that until we understand this properly, neither of us is getting further than a mile from the other — so you may as well stop looking at me like I'm the inconvenience here."`,
      choices: [
        { label: "Guard yourself — keep this strictly practical", next: "n4a" },
        { label: "Let the forced closeness actually mean something", next: "n4b" }
      ]
    },

    n3_pressed: {
      chapter: "Three — Before You Accept",
      text: `"Not so fast." You plant yourself, tether or no tether. "You don't get to skip past *why a knight was alone in a mage tower at midnight* just because we're stuck together now."

He goes very still — the particular stillness of someone deciding how much truth is safe to hand over. "I wasn't sent. I came on my own information, off the record, because the official channels have been compromised for months and I didn't trust anyone else to actually catch whoever's been bleeding that tower dry."

"That's not an answer, that's a confession with extra steps."

"It's the truth, which is more than I usually offer people who've just tried to gut me with a ward." A ghost of something like respect in his voice now. "I don't know yet if you're what I was hunting, or just unlucky timing. I intend to find out. Together, apparently, whether either of us likes it."

"And if I'm exactly what you were hunting?"

"Then we'll have a very different conversation." He holds your gaze, steady. "But I don't think you are. Call it instinct."

The tether pulls taut as he steps back — testing it again, an old habit already forming.`,
      choices: [
        { label: "Guard yourself — keep this strictly practical", next: "n4a" },
        { label: "Let the forced closeness actually mean something", next: "n4b" }
      ]
    },

    n4a: {
      locked: true,
      chapter: "Four — Guarded",
      text: `"Practical," you say, putting as much distance between you as the tether allows, which isn't much, but it's the principle of the thing. "We figure out how to break this. We don't make it complicated."

"Complicated," he repeats, like he's testing the word for hidden meaning.

"You know what I mean."

"I do." He doesn't argue — which somehow lands worse than if he had. Steps back too, matching your distance like a man relieved to have permission. "Practical suits me. I have a war-band waiting on a report I'm now three days late for, and you presumably have a life that doesn't involve permanent proximity to dragon-blood."

"Presumably."

"Then we find whoever rewrote this binding, we break it, and we go back to being strangers who tried to kill each other once." His voice is carefully even, the tone of a man closing a door with great precision instead of slamming it. "Efficient."

"Efficient," you agree, and try to ignore how hollow the word sounds now that it's actually been said out loud.

He doesn't push. You almost wish he would.`,
      choices: [
        { label: "Follow the trail of who did this", next: "n5", setFlag: { name: "guarded", value: true } },
        { label: "Question whether he's really as unaffected as he claims", next: "n5_pressed", setFlag: { name: "guarded", value: true } }
      ]
    },

    n4b: {
      locked: true,
      chapter: "Four — Undone",
      text: `You don't put the distance between you. It's the only decision you make on purpose — after that, there's just how close the grain store's single lantern makes everything feel, and the fact that neither of you has stepped back since the tether went slack.

"This is a terrible idea," you say, not moving.

"Almost certainly." His voice has dropped, rougher than the clipped knight's-tone from an hour ago. "You did just try to kill me."

"You were hunting me first."

"Fair." His hand finds your jaw, unhurried, like a man who's spent the last hour arguing himself out of exactly this and losing. "For what it's worth — I don't think you're what I came here to catch."

"That's not an apology."

"No." Something almost like a smile. "It's a start."

You close what little distance the tether left between you, and let that be the answer neither of you has words for yet. Whatever this binding actually wants from the two of you, it stops mattering for a while — just the lantern light, and three months of hunting resolving into something neither of you expected to find at the end of it.

"We should still talk about the ward," you murmur eventually, not moving.

"We should," he agrees, and doesn't move either.`,
      choices: [
        { label: "Talk about the ward anyway — follow the trail of who did this", next: "n5", setFlag: { name: "guarded", value: false } },
        { label: "Ask what this means before it goes further", next: "n5_pressed", setFlag: { name: "guarded", value: false } }
      ]
    },

    n5: {
      locked: true,
      chapter: "Five — The Deeper Truth",
      text: `The trail leads, infuriatingly, back toward his own war-band's territory — and the deeper truth waiting there is worse than either of you expected.

"It wasn't random," he admits, once the pieces are laid out between you: ledgers, a rewritten glyph-key, a name that makes his expression go carefully blank. "Someone in my own house has been selling old binding-magic to whoever's been robbing mage towers up and down the coast. Your ward didn't misfire. It was *sabotaged* — rewritten to bind whoever triggered it to the nearest dragon-blood, permanently, as insurance against exactly the kind of knight who might come asking questions."

"Insurance against you specifically."

"Against anyone who might interfere." His jaw tightens. "Which means this binding isn't an accident we can just dissolve once we find the source. It's a weapon someone built on purpose — and it's still active, which means whoever built it can likely still see through it, in ways we haven't found yet."

"So it's not just about breaking the tether."

"No." He meets your eyes, unflinching. "It's about whether we can end this cleanly — sever their control over it entirely — or whether we're stuck managing a leash someone else still holds the other end of. That takes both of us, genuinely aligned, nothing held back. If either of us is still protecting some piece of ourselves—"

"It won't work."

"It won't work." He exhales. "So — whatever's actually true for you. I need it now, not the safe version."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n5_pressed: {
      locked: true,
      chapter: "Five — What This Costs",
      text: `Before either of you moves toward the trail, you stop him. "Before we chase this any further — what does it actually cost you, if this doesn't resolve clean? You said your own house is compromised. What happens to you if we expose them?"

He's quiet long enough that you know the honest answer isn't comfortable. "Everything, potentially. Rank, standing, maybe worse, depending how deep the rot runs. I'm asking you to help me burn down my own house from the inside, and I don't have the right to pretend that's a small thing to ask."

"Then why do it?"

"Because the alternative is letting whoever did this keep using people like you as raw material for weapons like this one." Something steady and certain in his voice now, no performance left in it. "That matters more to me than what it costs me. I'd rather lose my house honestly than keep it built on this."

It's not comfortable, but it's real — and today that counts for more than comfort would.

The trail leads back toward his own war-band's territory, and what's waiting there is worse than either of you expected: ledgers, a rewritten glyph-key, a name that makes his expression go carefully blank. Someone in his own house built this binding on purpose, as a weapon.

"Whatever's true for you," he says, once the full shape of it is laid bare between you, "I need it now. Not the safe version."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n6_final_hold: {
      locked: true,
      chapter: "Six — What You're Willing to Risk",
      text: `"What's necessary," you say, "is that we sever their control and neither of us gets killed doing it. That's what's true. The rest isn't relevant to winning this."

He studies you a long moment, and whatever cautious hope had been building behind his eyes quietly closes, like a door pulled to without slamming.

"Understood," he says, quiet. "Then let's finish this on those terms."`,
      choices: [
        { label: "Stand together and end it, exactly as agreed", branchOn: { flag: "guarded", ifTrue: "n6_severance", ifFalse: "n6_reckoning" } },
        { label: "Walk away instead", next: "n6_unbound" }
      ]
    },

    n6_surrender: {
      locked: true,
      chapter: "Six — Surrender",
      text: `"The truth," you say, "is that I stopped thinking of this as a leash somewhere around the point I started being disappointed when you stepped too far away. I don't know when that happened. I know I don't want to undo it just because it's inconvenient to admit."

He crosses what little distance remains in two steps, and this time there's no tether pulling him, no ritual, no excuse required — just his hands framing your face like he's committing it to memory against the possibility of losing it.

"Say that again," he murmurs, "somewhere the whole rotten house of mine can hear it."

You do — standing over the evidence that's about to end his standing and expose a conspiracy three months in the making, the two of you speak the whole truth out loud, nothing held back for either of you to hide behind. The rewritten glyph-key unravels in your joined hands, the sabotage undone not by force but by there being nothing left in either of you for it to exploit.

Whatever comes next — his house, the fallout, the parts of both your lives this upends — you face it having already said the truest thing either of you has said all week.

"Stay," he says. Not a command. A question, for the first time.

"Try and stop me," you answer, and mean every word of it.`,
      ending: true,
      tag: "Ending: Surrender"
    },

    n6_reckoning: {
      locked: true,
      chapter: "Six — Reckoning",
      text: `"What's true," you say, "is that I stopped seeing you as the enemy days ago, and I'm not going to pretend that's nothing. But I'm also not going to pretend it's simple, not with everything this is about to cost you."

It's not the declaration he might have hoped for. You watch him recalibrate rather than deflate.

"It's honest," he says. "That's what this needs — not a fairy tale, the truth, whatever shape it takes."

Standing over the evidence together, you speak your complicated, careful truth aloud, and it's enough — the sabotage unravels, his house's conspiracy laid bare for what it is, undone by two people who told the truth without needing it to be a love story yet.

Afterward, in the wreckage of everything his house is about to lose, he doesn't reach for you the way he might have if you'd said something softer.

"We don't have to decide the rest of it tonight," he says instead. "The binding's broken either way. Whatever's between us can take whatever time it actually needs."

"That's unexpectedly reasonable of a man who just burned his own house down."

"I'm told I've had a very educational week." A faint, real almost-smile. "Turns out I learn fast."`,
      ending: true,
      tag: "Ending: Reckoning"
    },

    n6_severance: {
      locked: true,
      chapter: "Six — Severance",
      text: `Standing over the evidence together, you say only what's necessary. The glyph-key flares — and resists.

"It's not enough," he says, understanding it in real time, the exact moment the unraveling stalls. "It has to be everything. You have to mean it completely, or the binding holds them a way in—"

The sabotage fights back. Whatever's left of the conspiracy's control finds the gap you left guarded and drives into it. You fight — dragon-blood or not, a mage who nearly took his arm off once doesn't fight any less hard the second time — and between the two of you the immediate threat is beaten back, his house's worst secret exposed regardless.

But the binding itself doesn't fully sever. Can't, built as it was on half-truths held at careful arm's length.

"It'll fade eventually," he says afterward, standing the length of the room away, voice carefully even. "Slowly. Not the clean break it could have been."

"I did what I came here to do. The conspiracy's exposed."

"You did." No accusation in it, which is somehow worse. "That was always going to be enough to win. I think we both know it was never going to be enough for the rest of it."

No dramatic final argument — just two people who did the necessary thing and left everything else exactly where they found it: unresolved, guarded, chosen with open eyes instead of avoided in the dark.`,
      ending: true,
      tag: "Ending: Severance"
    },

    n6_unbound: {
      locked: true,
      chapter: "Six — Unbound",
      text: `"No," you say, and it comes out steadier than you expect. "I'm not standing here performing certainty I don't have, not even to save your house. Not even for this."

He doesn't reach for you. Doesn't argue. Just looks at you like he's recalculating something he thought he already understood about how this would end.

"Then don't," he says finally. "I'd rather lose my house honestly than win this on a lie you told standing next to me."

You walk away before the confrontation plays out fully. The binding holds just enough to keep the worst of the sabotage's immediate danger contained — a temporary reprieve, not a solution, bought by the honesty of your refusal rather than the strength of a bond neither of you finished building. It won't hold forever. You both know it.

At the door, he stops you — not with a hand, just your name, said plainly, no performance left in it.

"For what it's worth," he says, "I'd rather have this — you, honest, walking away — than a version of you that stayed for the wrong reason."

You don't have an answer for that either. You leave anyway, the conspiracy still smoldering behind you, the tether still faintly humming between you both — and for the first time since the tower, nothing unsaid weighing down the road ahead.`,
      ending: true,
      tag: "Ending: Unbound"
    }
  }
};
