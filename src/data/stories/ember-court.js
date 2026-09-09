// The Ember Court — flagship title. Ported directly from the HTML prototype.
// This structure (startNode + nodes, each with text/choices/ending) is the
// contract the engine expects — any future title (or a Supabase-fetched
// one) just needs to match this shape.

export const emberCourt = {
  startNode: "n1",
  nodes: {

    n1: {
      chapter: "One — The Summons",
      text: `The letter finds you at the worst possible hour — past midnight, when the wards on your door are thinnest and your guard is already down. It doesn't knock. It simply arrives, resting on your windowsill as if it had always been there, wax seal the color of something that used to be alive.

You know that seal. Three years hasn't dulled the memory of it pressed into skin instead of paper.

*Come to the ember court, or the debt comes due.*

No signature. It doesn't need one.

Your training says to burn it and salt the ash. Your training has never once stopped you from doing the opposite of what it says where he's concerned.

You remember him the way you remember a wound that healed wrong — a story your body tells even when your mind has moved on. The tilt of his head when he was deciding whether to lie to you. The one night he didn't. The morning after, when you left before he woke, because staying felt like a debt you couldn't afford.

Three years. A hunter's oath, unbroken. A court sinking into ruin somewhere beneath dark water, waiting for you to decide what you still owe it.

The letter doesn't burn easily. You notice that before you notice you're still holding it.`,
      choices: [
        { label: "Refuse the summons — let him come to you", next: "n2a" },
        { label: "Answer the call — go to him", next: "n2b" }
      ]
    },

    n2a: {
      chapter: "Two — What He Left Behind",
      text: `You write your refusal in four words and send it before you can talk yourself out of it. *I owe you nothing.*

It's a lie you've told yourself for three years. Writing it down doesn't make it truer.

By dusk the following day, he is standing in your doorway anyway — rain dark on his shoulders, a crown of black iron pushed carelessly back from his temple like he forgot he was wearing it. He looks like a man who has run out of other options, which should be impossible for someone who commands a court.

"You don't get to refuse this," he says, quiet in a way that used to undo you and apparently still does. "Not this."

"You don't get to show up at my door and tell me what I don't get to do."

Something that might be a smile, might be a wince, crosses his face. "Fair."

He doesn't come in uninvited. He waits — rain soaking through, patient as a debt collector who knows he'll be paid eventually — until you step back from the doorway, which is as close to an invitation as either of you can manage after three years of practiced distance.

"The debt was never gold," he says, once he's inside, once the door is shut against the rain and the two of you are standing too close in a room that suddenly feels too small. "It was a promise. Made before either of us understood what we were promising."

"Then unmake it."

"I can't." His voice drops. "Not without you standing in front of me while I try."

You feel the old anger rise, familiar as a scar you keep forgetting to stop touching. But underneath it — inconveniently, infuriatingly — something else stirs too. An ember that apparently never went out, no matter how thoroughly you told yourself it had.`,
      choices: [
        { label: "Let him explain the binding", next: "n3" },
        { label: "Ask what he's not telling you", next: "n3_pressed" }
      ]
    },

    n2b: {
      chapter: "Two — The Ember Court",
      text: `You arrive as the last torches gutter, the court's black stone walls slick with a rain that never quite becomes weather. Three years since you last walked these halls, and they remember you — the guards straighten, the shadows seem to lean in, the whole place exhaling like it's been waiting.

He is at the top of the stairs, exactly where he used to wait for you. Except now there's a crown of black iron resting against his temple, and something colder behind his eyes that wasn't there before — or that you didn't let yourself see.

"You came," he says. "I wasn't certain you would."

"I wasn't certain either."

He descends slowly, the careful, deliberate pace of someone who has spent three years learning not to run toward things he wants. When he stops, there's still a full arm's length between you — a distance you both maintain like a rule neither of you wrote down but both agreed to follow.

"Tell me about the debt," you say, because it's safer than every other question crowding your throat.

"It was never gold." His eyes don't leave yours. "It was a promise. Made three years ago, in a room very like this one, by two people who didn't understand what they were promising."

"That's not an answer."

"It's the only honest one I have." A muscle in his jaw tightens. "The court is dying, and the only thing holding what's left of it together is an oath I made without knowing its price. I need you standing in front of me while I try to pay it."

The old anger surfaces first, familiar as a scar. But underneath it, something else — an ember you'd have sworn was long since cold — stirs anyway.`,
      choices: [
        { label: "Let him explain the binding", next: "n3" },
        { label: "Ask what he's not telling you", next: "n3_pressed" }
      ]
    },

    n3_pressed: {
      chapter: "Three — Before You Agree",
      text: `"Before I agree to anything," you say, "tell me what you're not saying. You've never once summoned me over something simple."

He's quiet long enough that you know you're right.

"The oath is failing faster than I let on," he admits finally. "I've had months, not the years I implied. If this doesn't work tonight, there may not be another chance to try it properly." A pause. "I didn't want to pressure you with a deadline. I see now that not telling you was its own kind of pressure."

"That's a start."

"It's the truth, which is more than I've usually managed with you." He leads you into the ritual chamber, salt and something older than salt heavy in the air. "The binding still needs blood, intent, and proximity. Now you're deciding with the full picture instead of half of one."

He holds out his hand, palm up, an old iron blade resting across it. The blade is cold against your palm. His hand, when it closes around yours to complete the cut, is not.

The magic moves through the room like a held breath finally released — not violent, not loud, just *present*, settling into the space between your joined hands like something remembering where it belongs. He goes very still. So do you.

"There," he says, low, closer than he was a moment ago, though neither of you moved that you noticed. "It's done."

It doesn't feel done. It feels like the opposite of done — like a door that was locked for three years just swung open, and neither of you has decided yet whether to walk through it.`,
      choices: [
        { label: "Guard yourself — pull back before this goes further", next: "n4a" },
        { label: "Lower your guard — let the moment happen", next: "n4b" }
      ]
    },

    n3: {
      chapter: "Three — The Binding",
      text: `The ritual chamber smells of salt and something older than salt. He explains it plainly, without the practiced charm you remember him wielding like a weapon — the oath he swore three years ago, half-understood, has been unraveling the court's protections ever since. The only way to re-anchor it is to complete what was started. Together. Now.

"What does that mean," you ask, "in practice."

"A binding." He holds out his hand, palm up, an old iron blade resting across it. "Blood, intent, and proximity. You don't have to feel anything for it to work. It only requires that you're honest about what's true."

"And if I'm not honest?"

"Then it doesn't take. And the court falls, and so does every ward keeping worse things out of the human world along with it." He meets your eyes. "I'm not asking you to feel something you don't. I'm asking you to stop pretending you don't feel something you do."

The blade is cold against your palm. His hand, when it closes around yours to complete the cut, is not.

The magic moves through the room like a held breath finally released — not violent, not loud, just *present*, settling into the space between your joined hands like something remembering where it belongs. He goes very still. So do you.

"There," he says, low, closer than he was a moment ago, though neither of you moved that you noticed. "It's done."

It doesn't feel done. It feels like the opposite of done — like a door that was locked for three years just swung open, and neither of you has decided yet whether to walk through it.

His thumb moves once, absently, over the back of your hand. Neither of you lets go.`,
      choices: [
        { label: "Guard yourself — pull back before this goes further", next: "n4a" },
        { label: "Lower your guard — let the moment happen", next: "n4b" }
      ]
    },

    n4a: {
      locked: true,
      chapter: "Four — Guarded",
      text: `You pull your hand back. It costs more than it should.

"That's enough," you say, and your voice comes out steadier than you feel, which is its own small victory. "The binding's done. That's what we came here for."

He doesn't argue. That's almost worse than if he had — it means he expected this, has been braced for it since the moment you walked back into the court. He steps back too, putting the distance between you that you asked for without you having to ask twice.

"Understood." His voice has gone carefully neutral, the tone of a man closing a door gently instead of slamming it. "The wards should hold now. You're free to go whenever you—"

"I'm not going anywhere yet." The words surprise you as much as him. "Not until I understand what's actually happening to this court. If I'm bound to it now, I want to know what I'm bound to."

Something shifts in his expression — not hope, exactly, but its more cautious cousin. "Then let me show you what's underneath."

You follow him deeper into the court, keeping careful distance, keeping your training close like armor. It's easier this way, you tell yourself. Duty first. Whatever this is between you, it can wait — has waited three years already, can wait a while longer while you figure out whether the court, and the man who rules it, can be trusted with anything at all.

He doesn't try to close the distance again. You almost wish he would.`,
      choices: [
        { label: "Follow him into the deeper truth", next: "n5", setFlag: { name: "guarded", value: true } },
        { label: "Question his intentions before going further", next: "n5_pressed", setFlag: { name: "guarded", value: true } }
      ]
    },

    n4b: {
      locked: true,
      chapter: "Four — Undone",
      text: `You don't pull back.

It's the only decision you make consciously — after that, there's just the warmth of his hand still wrapped around yours, the closeness neither of you retreats from, and three years of careful distance collapsing into the space of a single breath.

"I should hate you," you murmur, close enough now that the words land against his jaw instead of the air between you.

"You should," he agrees, voice rough in a way you feel more than hear. "I've given you every reason to."

"That's not an apology."

"No." His free hand finds your jaw, tilts your face up to his, unhurried in a way that feels deliberate — like he's spent three years imagining this moment and refuses to rush through it now that it's real. "It's an explanation. The apology comes after."

"After what?"

"After I've stopped being afraid you'll leave again the second I let go."

You don't have an answer for that — not one you trust yourself to say out loud — so you close the last of the distance instead, and let that be the answer.

What happens next belongs to the two of you and no one else — the ritual chamber forgotten, the court's crumbling wards forgotten, three years of silence finally, thoroughly answered. When you surface again, torchlight has burned low and neither of you has said a single practical word in what might be hours.

"We should talk about the court," you say eventually, not moving.

"We should," he agrees, and doesn't move either.`,
      choices: [
        { label: "Talk about the court anyway — follow him into the deeper truth", next: "n5", setFlag: { name: "guarded", value: false } },
        { label: "Ask what this means before it goes further", next: "n5_pressed", setFlag: { name: "guarded", value: false } }
      ]
    },

    n5: {
      locked: true,
      chapter: "Five — The Deeper Truth",
      text: `He leads you down through the court's oldest halls, past wards that flicker like dying candles, to a chamber where the water starts — the true source of why the court is drowning, in every sense of the word.

"It was never just my failing oath," he admits, and for the first time since you arrived, he sounds tired in a way that has nothing to do with performance. "The dragon-blooded house to the east has been bleeding this court's protections dry for a decade, feeding on the instability, waiting for the wards to fail completely so they can claim what's left. My oath was the last thing holding the breach shut. It's why I needed you — a hunter's blood carries old protections theirs can't touch."

"You used me to shore up a war you didn't tell me you were losing."

"I used everything I had left, because the alternative was losing the court to people who'd use it far worse." He holds your gaze, unflinching. "I should have told you from the letter. I didn't, because I was afraid you'd say no. That's on me, not you."

The water in the chamber churns, restless, reflecting torchlight in patterns that don't quite make sense — like something ancient stirring closer to the surface than it should be.

"There's a way to end this properly," he says. "Not just patch the wards — sever the eastern house's claim entirely. But it requires both of us standing against them together, publicly, as a bound pair with nothing hidden between us. If either of us is still holding back—"

"It won't work."

"It won't work." He exhales. "So. Whatever's true for you — I need to hear it now. Not the version you think is safe to say."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n5_pressed: {
      locked: true,
      chapter: "Five — What This Means",
      text: `Before he leads you anywhere, you stop him. "Before we go further — what does this actually mean? The binding. Us. I'm not walking into another decision half-informed."

He considers that longer than you expect from a man usually so quick with an answer. "It means I'm bound to you the way I was always going to end up, oath or not. What you do with that is entirely yours to decide. I'm not going to pretend otherwise to get what I need from you tonight."

It's not a full answer. It's an honest one, which today counts for more.

He leads you down through the court's oldest halls, past wards that flicker like dying candles, to a chamber where the water starts — the true source of why the court is drowning, in every sense of the word.

"It was never just my failing oath," he admits. "The dragon-blooded house to the east has been bleeding this court's protections dry for a decade, waiting for the wards to fail completely so they can claim what's left. My oath was the last thing holding the breach shut. It's why I needed you — a hunter's blood carries old protections theirs can't touch."

"You used me to shore up a war you didn't tell me you were losing."

"I used everything I had left, because the alternative was losing the court to people who'd use it far worse." He holds your gaze, unflinching. "I should have told you from the letter. I didn't, because I was afraid you'd say no."

"There's a way to end this properly," he continues. "Not just patch the wards — sever the eastern house's claim entirely. It requires both of us standing against them together, as a bound pair with nothing hidden between us. Whatever's true for you — I need to hear it now."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n6_final_hold: {
      locked: true,
      chapter: "Six — What You're Willing to Risk",
      text: `"What's necessary," you say, "is that the wards hold and the court survives. That's what's true. The rest is not relevant to winning this fight."

He studies you for a long moment, and something in his face — the cautious hope from earlier — closes like a door.

"Understood," he says quietly. "Then let's finish what we came here to do."`,
      choices: [
        { label: "Stand together and end it, on those terms", branchOn: { flag: "guarded", ifTrue: "n6_severance", ifFalse: "n6_reckoning" } },
        { label: "Walk away instead", next: "n6_unbound" }
      ]
    },

    n6_surrender: {
      locked: true,
      chapter: "Six — Surrender",
      text: `"The truth," you say, "is that I've spent three years lying to myself, not to you. I told myself I left because I didn't feel anything. I left because I felt too much, and I didn't know what to do with a hunter who was supposed to end things like you, not love them."

He crosses the space between you in two steps, and this time there's no ritual, no oath, no excuse required — just his hands framing your face like he's memorizing it against the possibility of losing it again.

"Say that again," he murmurs, "somewhere the whole court can hear it."

You do. Standing at the water's edge, bound hand in hand, the two of you speak the truth out loud — not a spell, not a ritual, just honesty, finally, after three years of its absence. The water stills. The old wards flare bright and hold, not because of blood or oath, but because there is nothing left hidden between you for anything to exploit.

The eastern house's claim shatters like something that was never as strong as it pretended to be.

Later — much later, torches burned to embers, the court quiet and whole around you for the first time in a decade — he pulls you back against him, unhurried, certain, like a man who has finally stopped bracing for you to leave.

"Stay," he says. Not a command. A question, this time.

"Try and stop me," you answer, and let the rest of the night belong to no one but the two of you.`,
      ending: true,
      tag: "Ending: Surrender"
    },

    n6_reckoning: {
      locked: true,
      chapter: "Six — Reckoning",
      text: `"What's true," you say, "is that I came back because some part of me never fully left. I'm not going to pretend that's nothing. But I'm also not going to pretend it's simple."

It's not the declaration he was hoping for. You can see that in the flicker behind his eyes. But he nods, slowly, like a man recalibrating rather than a man defeated.

"It's honest," he says. "That's what the wards need. Not a fairy tale — the truth, whatever shape it takes."

Standing together at the water's edge, hands joined, you speak your careful, complicated truth aloud, and it's enough — the old wards flare and hold, not because the moment is perfect, but because nothing between you is hidden, even the uncertain parts. The eastern house's claim breaks apart, its decade of patient scheming undone by two people who told the truth without needing it to be a love story yet.

Afterward, standing in a court finally safe, he doesn't reach for you the way he might have if you'd said something softer.

"We don't have to decide everything tonight," he says instead. "The alliance holds either way. Whatever's between us can take the time it needs."

"That's very reasonable of you."

"I'm told I've had three years to learn patience." A faint, real smile. "Turns out I did."

It isn't the ending where everything is resolved in a single night. It's the one where the court survives, the truth was enough, and whatever comes next between you gets to be built slowly, on your own terms, instead of forced by a debt neither of you chose.`,
      ending: true,
      tag: "Ending: Reckoning"
    },

    n6_severance: {
      locked: true,
      chapter: "Six — Severance",
      text: `Standing at the water's edge, hands joined, you say only what's necessary. The wards flare — and falter.

"It's not enough," he says, and you can hear him understanding it in real time, the exact moment the plan starts to fail. "It has to be everything. You have to mean it completely, or—"

The water surges. Somewhere beneath it, the eastern house's claim finds the gap you left and drives into it.

You fight — of course you fight, a hunter's instincts don't disappear because a plan collapses — and between the two of you, the immediate threat is beaten back, the court saved from falling tonight, at least. But the oath, the deeper binding meant to end this permanently, doesn't take. Can't take, built as it was on half-truths held at careful arm's length.

"The court will hold for now," he says afterward, standing the length of the chamber away from you, voice carefully even. "Not forever. Not the way it could have."

"I did what I came here to do."

"You did." He doesn't argue, doesn't accuse — which somehow makes it worse. "That was always going to be enough for the court. I think we both know it was never going to be enough for this."

There's no anger in it. That's the part that stays with you afterward — no final fight, no dramatic parting words, just two people who protected what needed protecting and left the rest exactly where they found it three years ago: unresolved, guarded, and — this time — both of you choosing it with open eyes instead of running from it in the dark.

The debt is paid. The ember, carefully, deliberately, is left to go out on its own terms.`,
      ending: true,
      tag: "Ending: Severance"
    },

    n6_unbound: {
      locked: true,
      chapter: "Six — Unbound",
      text: `"No," you say, and the word surprises you with how steady it comes out. "I'm not standing here and pretending to be certain of something I'm not, not even to save a court. Not even this one."

He doesn't reach for you. Doesn't argue. For a long moment he just looks at you like he's recalculating something he thought he already understood.

"Then don't," he says finally. "I'd rather lose the court honestly than win it on a lie you told standing next to me."

You leave before the ritual completes. The binding holds just enough to keep the worst of the immediate threat out — a temporary patch, not a solution, bought by the honesty of your refusal rather than the strength of a bond neither of you finished. It won't last forever. Both of you know it.

At the door, he stops you — not with a hand, just with your name, said plainly, without performance.

"For what it's worth," he says, "I'd rather have three more years of you telling me the truth from a distance than one night of you lying to me up close."

You don't have an answer for that either. You leave anyway, the debt unpaid, the court standing on borrowed time, and — for the first time in three years — nothing unsaid weighing down the road behind you.

Whatever happens to the ember court next, it happens without either of you pretending to be something you weren't ready to be tonight.`,
      ending: true,
      tag: "Ending: Unbound"
    }
  }
};
