// Court of Salt and Drowning — third title. Same engine contract as the
// others: diamond branch structure, free through "n3" tier, locked from
// "n4" onward, 4 endings gated by the guarded/trust flag.

export const saltAndDrowning = {
  startNode: "n1",
  nodes: {

    n1: {
      chapter: "One — What the Tide Took",
      text: `Your sister has been missing three days when the tide finally gives her back — not drowned, not quite alive either, skin gone the pale blue-grey of something that belongs underwater now. The healers in the village won't touch her. They say the sickness in her isn't a sickness at all.

They're not wrong. You've treated fever, rot, poison, the ordinary cruelties of ordinary bodies. You have never treated a girl who breathes salt water instead of air and doesn't seem to notice the difference.

The old woman who sells charms at the harbor tells you what no one else will say aloud: the sea-fae court took something of hers when she wandered too close to the tide-line, and it's slowly taking the rest of her now, the way a debt collects interest. There's only one way to stop it. Go under. Ask the court to name its price.

Nobody sane makes that bargain willingly.

You are, by the time you reach the shoreline that night, no longer feeling especially sane.`,
      choices: [
        { label: "Walk into the water before you can think better of it", next: "n2a" },
        { label: "Wait for the court to come to you instead", next: "n2b" }
      ]
    },

    n2a: {
      chapter: "Two — Under",
      text: `The water doesn't feel cold once you're past your knees. It feels like being expected.

You go under fully at the fourth step, and the drowning that should happen doesn't — your lungs adjust to something that isn't quite water and isn't quite air, and the surface above you seals over like it was never there. The court reveals itself the way a bruise reveals itself: slowly, and in colors that shouldn't exist.

He's waiting at the threshold of it, exactly like the stories warn — pale as bone, dressed like mourning, eyes the flat grey of a sea with nothing left to give. Exiled, the charm-seller had said. Cast out from his own court's favor for a crime no one above the water remembers correctly anymore.

"You shouldn't have come here whole," he says, studying you like a specimen. "Most who walk in do it already half-claimed."

"My sister isn't half-claimed. She's dying."

Something crosses his face — not quite sympathy, something older and warier. "Then you'll want to speak carefully. Everything down here has a price. I'd rather you understood that before you start bargaining, not after."`,
      choices: [
        { label: "Demand to see whoever's responsible", next: "n3" },
        { label: "Ask why he's the one who came to meet you", next: "n3_pressed" }
      ]
    },

    n2b: {
      chapter: "Two — He Comes to the Shallows",
      text: `You don't go under. You stand at the tide-line instead, feet bare in the freezing shallows, and you wait — some instinct telling you that walking fully into a bargain you don't understand is exactly the kind of mistake that gets people's sisters half-drowned in the first place.

He surfaces just past midnight, close enough to shore that the moon catches him properly: pale as bone, dressed like mourning, eyes the flat grey of a sea with nothing left to give.

"Careful," he says, an odd note of approval in it. "Most who come here don't think to wait at the edge first."

"I'm not walking into anything until I understand what took my sister."

"Wise." He studies you the way you imagine he studies currents — assessing, patient, faintly surprised to find something worth the attention. "The court claimed her. Not maliciously — the tide simply takes what wanders too close to it too often, the way rot takes fruit left out. I can't undo that from here. You'd have to come under properly, and bargain."

"Then take me under."

"That's a request you'll want to make more carefully than you just did." Something almost gentle in the warning. "Everything down here has a price."`,
      choices: [
        { label: "Demand to see whoever's responsible", next: "n3" },
        { label: "Ask why he's the one who came to meet you", next: "n3_pressed" }
      ]
    },

    n3: {
      chapter: "Three — The Cost of Asking",
      text: `"Responsible," he repeats, like the word tastes strange. "The court doesn't have a single throat to throttle, if that's what you're picturing. It has currents. Appetites. Your sister wandered into one of them, the same way anyone drowns — not through malice, just through the tide not caring one way or the other."

"That's not good enough."

"No," he agrees, "it isn't. Which is why I'm the one who met you, rather than leaving you to whoever else might have found you first." He leads you deeper, through halls that seem built from something between coral and bone, drowned light filtering down from nowhere obvious. "I can undo what's been done to her. The court still answers to old debts, and I am owed several. But undoing a claim requires binding something else in its place, and I won't let you offer yourself up without understanding exactly what that costs."

"Then tell me."

"A season, at minimum. Bound to this court, unable to surface, in exchange for her release." His eyes don't leave yours. "I've watched people pay it without understanding what a season down here actually does to a person who isn't built for the dark. I'd rather you go in with your eyes open than not at all."`,
      choices: [
        { label: "Guard yourself — treat this as a transaction to survive", next: "n4a" },
        { label: "Let yourself actually trust him", next: "n4b" }
      ]
    },

    n3_pressed: {
      chapter: "Three — Why You",
      text: `"Why did you come yourself," you ask, "instead of sending someone else, or no one at all?"

He's quiet long enough that the silence itself becomes an answer. "Because I know exactly what it costs to be claimed by something that doesn't ask permission first. I was exiled from favor here for objecting too loudly to a bargain much like the one you're about to make. I'd rather stand between someone and that mistake than pretend I didn't recognize it happening again."

"That's not really an answer either."

"It's the truthful one, which is rarer down here than you'd think." A ghost of something wry in his expression. "The court doesn't have a single throat to throttle. It has currents, appetites — your sister wandered into one, the way anyone drowns. Not malice. Just tide."

He leads you deeper, through halls built from something between coral and bone. "I can undo the claim. It requires binding something else in its place — a season bound to this court, unable to surface, in exchange for her release. I've watched people agree to that without understanding what it does to someone not built for the dark down here. I'd rather you understand fully before you offer anything."`,
      choices: [
        { label: "Guard yourself — treat this as a transaction to survive", next: "n4a" },
        { label: "Let yourself actually trust him", next: "n4b" }
      ]
    },

    n4a: {
      locked: true,
      chapter: "Four — What You Won't Give Away",
      text: `"A season," you say. "Fine. I'll survive a season. I don't need you managing how I feel about it while I do."

Something flickers behind his grey eyes — not hurt, exactly, something more practiced than that, like a man well used to being kept at careful arm's length and mostly resigned to it. "Understood."

"I mean it. I'm here for her, not for anything else this court might be offering."

"I never assumed otherwise." His voice goes carefully even, the tone of someone closing a door with precision instead of slamming it. "I'll show you the terms of the binding. You'll want to know exactly what a season down here requires before you agree to any of it."

He doesn't push past the distance you've drawn. Doesn't try to close it, doesn't linger a moment longer than the practical requires. You tell yourself that's a relief.

You almost believe it.`,
      choices: [
        { label: "Learn the true terms of the binding", next: "n5", setFlag: { name: "guarded", value: true } },
        { label: "Ask what happened to him, specifically, when he was exiled", next: "n5_pressed", setFlag: { name: "guarded", value: true } }
      ]
    },

    n4b: {
      locked: true,
      chapter: "Four — What the Dark Doesn't Take",
      text: `You don't pull away from him. It surprises you more than it seems to surprise him — like some part of you decided, somewhere between the shoreline and here, that a man willing to warn you honestly about a price rather than let you walk blind into it had earned more than wary distance.

"You don't have to do this alone," he says, quiet, closer than the conversation strictly requires.

"I know how this sounds. Trusting the first thing that offered to help."

"It should sound like caution earned somewhere. I'd rather you kept some." Something almost rueful in it. "I'm only asking you not to mistake caution for the same thing as refusing every hand offered to you down here."

His hand, when it finds yours, is colder than a human hand should be and steadier than you expect. Neither of you pulls back.

Whatever this season under the water is going to cost you, it stops feeling like something you're facing entirely alone — which terrifies you almost as much as the tide did, and for reasons that have nothing to do with drowning.

"Tell me the terms," you say eventually, not moving. "All of them. I want to understand what I'm agreeing to."

"You will," he promises. "Every word of it."`,
      choices: [
        { label: "Learn the true terms of the binding", next: "n5", setFlag: { name: "guarded", value: false } },
        { label: "Ask what happened to him, specifically, when he was exiled", next: "n5_pressed", setFlag: { name: "guarded", value: false } }
      ]
    },

    n5: {
      locked: true,
      chapter: "Five — The Truth Below the Truth",
      text: `The terms, laid bare in the drowned light of the court's oldest chamber, are worse than a season.

"It was never going to be a clean trade," he admits, and for the first time since the shoreline, something like guilt moves through his voice. "The court doesn't just want a season of your presence. It wants a season of your *belief* — genuine surrender to this place, not merely tolerance of it. A grudging guest doesn't satisfy the claim. It has to be someone who chooses to stay, not someone counting days until release."

"You didn't lead with that."

"I was afraid you'd refuse before understanding there's no version of this that doesn't ask something real of you." He meets your eyes, unflinching. "I could have let you believe it was simpler. I'd rather you resent me for the truth than thank me for a lie that gets you trapped down here permanently when the court decides a grudging season doesn't count."

The water around the chamber stirs, patient, listening.

"There's still a way through," he says. "But it requires you to actually mean whatever you offer this place — not perform it. If you're only pretending to accept this, the court will know, and it will simply take longer. Take more. Whatever's true for you, I need it plainly. Not the version that sounds safest."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n5_pressed: {
      locked: true,
      chapter: "Five — What Exile Cost Him",
      text: `"Tell me," you say, before he leads you anywhere else. "What actually happened. Why they exiled you."

He's silent long enough you think he won't answer. "There was another bargain, years ago. Someone like you — desperate, unprepared, offered a season's binding without understanding the fine print of it. I objected. Loudly, and to the wrong people. The court doesn't tolerate its currents being questioned publicly. I was cast out from favor for it, left to linger at the threshold instead of the center, ever since."

"Did it help? The person you objected for?"

"No." The word costs him something to say. "That's the part I don't tell people. I made a scene, lost my standing, and it changed nothing for her at all. I've been more careful about how I intervene, ever since — which is why I'm telling you everything now, plainly, instead of making the same performative gesture twice."

The terms, when he finally lays them bare, are worse than a season: the court wants genuine surrender, not mere tolerance — someone who chooses to stay, not someone counting days.

"Whatever's true for you," he says, "I need it plainly now. Not the version that sounds safest."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n6_final_hold: {
      locked: true,
      chapter: "Six — What You Won't Perform",
      text: `"What's necessary," you say, "is that my sister surfaces breathing air again. That's what's true. I'm not going to manufacture something deeper than that just to satisfy a current's appetite."

He studies you a long moment, something behind his grey eyes quietly settling into resignation rather than surprise.

"Understood," he says. "Then let's see if the court accepts honesty that plain."`,
      choices: [
        { label: "Offer the plain truth and see if it's enough", branchOn: { flag: "guarded", ifTrue: "n6_severance", ifFalse: "n6_reckoning" } },
        { label: "Refuse the bargain entirely and find another way", next: "n6_unbound" }
      ]
    },

    n6_surrender: {
      locked: true,
      chapter: "Six — Surrender",
      text: `"The truth," you say, "is that somewhere between the shoreline and this chamber, staying stopped feeling like a sentence. I came down here to save my sister. I'm not leaving pretending that's the only reason I'd want to stay."

He goes very still, the particular stillness of a man who has spent longer than he'd admit not expecting to be chosen by anything down here, least of all willingly.

"Say that again," he murmurs, "where the current can carry it to every corner of this court."

You do — standing in the drowned light, nothing held back, and the water around you responds the way it never has to a grudging bargain: it stills, and settles, and releases its claim on your sister not because a debt was paid but because there's nothing left hidden for it to hold hostage. Somewhere above, in air you can no longer quite remember the taste of, you feel her breathe freely again.

"Stay," he says. Not a term of the bargain. A question, entirely his own.

"Try and make me leave," you answer, and mean it more than you've meant anything in your life above the water.`,
      ending: true,
      tag: "Ending: Surrender"
    },

    n6_reckoning: {
      locked: true,
      chapter: "Six — Reckoning",
      text: `"The truth," you say, "is that I don't hate this place the way I expected to. I don't know yet if that's real or just relief talking. I'm not going to perform certainty I don't have, not even to save her faster."

It's not the surrender he might have hoped the court would settle for. You watch him brace for it to be refused.

Instead, the water stills anyway — slower, more grudging, but genuine, accepting complicated honesty in place of a cleaner declaration. Your sister surfaces breathing, somewhere above, safe.

"That shouldn't have worked," he admits afterward, something like wonder in it.

"Maybe the current prefers honesty to theater."

"Maybe." A real, careful almost-smile. "We don't have to decide the rest of this tonight. You're free to surface, whenever you're ready. Whatever's between us can take whatever time it actually needs to become something neither of us has to perform."

It isn't the ending where everything resolves in one drowned night. It's the one where your sister lives, the truth was enough, and whatever comes next gets built slowly, on terms you actually chose.`,
      ending: true,
      tag: "Ending: Reckoning"
    },

    n6_severance: {
      locked: true,
      chapter: "Six — Severance",
      text: `You offer the plain truth, guarded and careful, and the water studies it the way a predator studies something that hasn't quite decided to run.

"It's not enough," he says, understanding a moment before you do. "It has to be real surrender, not a transaction dressed as one—"

The current surges. Whatever claim still holds your sister tightens rather than releases, and you fight — genuinely fight, healer's hands finding uses they were never trained for — until between the two of you, the immediate danger is beaten back and she's pulled free of the worst of it, breathing, alive, safe enough.

But the binding doesn't fully release. Can't, built as it was on guarded honesty held at careful arm's length instead of the whole truth.

"She'll live," he says afterward, the length of the chamber between you. "The claim will fade on its own, eventually. Slowly. Not the clean release it could have been."

"I did what I came here to do."

"You did." No accusation in it, which somehow makes it worse. "That was always going to be enough to save her. I think we both know it was never going to be enough for the rest of it."

No dramatic parting — just two people who did the necessary thing and left everything else exactly where the tide found it: unresolved, guarded, chosen with open eyes instead of avoided in the dark.`,
      ending: true,
      tag: "Ending: Severance"
    },

    n6_unbound: {
      locked: true,
      chapter: "Six — Unbound",
      text: `"No," you say, steadier than you expect. "I'm not offering this court a version of myself I don't actually mean, not even for her. There has to be another way, and I'm going to find it instead."

He doesn't argue. Doesn't try to talk you back into the bargain. Just watches you with something that might be respect, might be quiet grief at a door closing.

"There might be," he admits finally. "A harder path, older magic, less certain — but it wouldn't ask you to surrender anything you don't mean to give. I'll help you find it, if you'll let me. Not because the court asks it of me. Because I'd rather see you leave whole than watch you talked into something you'll regret."

You don't have an answer for the offer beyond accepting it. The two of you begin the longer, uncertain work of finding a way to save her that doesn't cost you a season of pretending — the current still humming around you, unclaimed, unresolved, and for the first time since the shoreline, entirely your own choice to make.

"For what it's worth," he says, walking beside you into the dark, "I'd rather help you find a harder truth than watch you settle for an easier lie."`,
      ending: true,
      tag: "Ending: Unbound"
    }
  }
};
