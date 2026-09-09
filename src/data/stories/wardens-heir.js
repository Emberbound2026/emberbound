// The Last Warden's Heir — fourth title. Same engine contract: diamond
// branch structure, free through "n3" tier, locked from "n4" onward,
// 4 endings gated by the guarded/trust flag.

export const wardensHeir = {
  startNode: "n1",
  nodes: {

    n1: {
      chapter: "One — The Last Rite",
      text: `Your mother dies the way every Warden before her did: mid-sentence, passing the order's last rite to you before she's finished explaining what it actually means. "The bond renews at your hand now," she manages, blood-slick fingers gripping yours. "He'll come to you within the week. Don't be afraid of what he is. Be afraid of what happens if the bond breaks."

She's gone before you can ask which *he* she means.

You bury her under the old wardstones, alone, the way Wardens have always buried their dead — a line of women stretching back three centuries, each one bound from birth to guard the seal between this world and the thing on the other side of it. You grew up on the stories. The demon your bloodline was founded to destroy, contained instead of killed because killing it would have broken something worse open.

You did not grow up expecting to inherit a bond with it.

Six nights after the funeral, something knocks on your door with a fist that sounds entirely, unnervingly human.`,
      choices: [
        { label: "Open the door with a blade already drawn", next: "n2a" },
        { label: "Open the door with nothing but your bare hands", next: "n2b" }
      ]
    },

    n2a: {
      chapter: "Two — What Answers the Door",
      text: `You open the door with the blade already moving, three centuries of training doing exactly what it was built to do.

He catches your wrist before the edge finds him — not with demonic speed exactly, something older and stranger than that, like the blade simply forgot what it was doing halfway through the swing. Up close he looks nothing like the stories: no horns, no smoke, just a tired-looking man with eyes the wrong color for a human and an expression that suggests he expected exactly this greeting.

"Your mother usually offered tea first," he says, releasing your wrist the moment you stop pulling against it. "But I suppose the blade is more honest."

"You're the thing my family has guarded a seal against for three hundred years."

"I'm the thing your family has been *bound to*, which isn't quite the same accusation, though I understand why it feels like it should be." He doesn't step closer. Doesn't try to disarm you further. "The bond passed to you the moment she died. I'm not here by choice any more than you are. I'm here because the alternative is the seal failing, and neither of us wants to find out what that actually looks like."`,
      choices: [
        { label: "Demand he explain the bond fully", next: "n3" },
        { label: "Ask what happened the last time a Warden refused him", next: "n3_pressed" }
      ]
    },

    n2b: {
      chapter: "Two — Bare Hands",
      text: `You open the door with nothing but your bare hands, some instinct telling you that meeting whatever this is with a weapon already drawn would answer a question you haven't asked yet.

He's nothing like the stories: no horns, no smoke, just a tired-looking man with eyes the wrong color for a human, standing on your porch like he's uncertain of his welcome despite three centuries of blood-right guaranteeing it.

"You didn't bring a blade," he says, something careful in his voice, like he's recalibrating an expectation. "Your mother always led with one, the first several decades, anyway."

"Should I have?"

"That depends entirely on what you decide about me in the next few minutes." He studies you, unhurried. "I'm the thing your bloodline was founded to guard against. I'm also the thing your bloodline has been bound to for three centuries, which your mother eventually understood isn't quite the contradiction it sounds like. The bond passed to you the moment she died. I didn't choose the timing any more than you did."

"And if I refuse the bond?"

"Then we should discuss that somewhere less exposed than your doorway," he says, "because the honest answer isn't a short one."`,
      choices: [
        { label: "Demand he explain the bond fully", next: "n3" },
        { label: "Ask what happened the last time a Warden refused him", next: "n3_pressed" }
      ]
    },

    n3: {
      chapter: "Three — The Shape of the Bond",
      text: `He explains it at your kitchen table, of all places, hands wrapped around a cup of tea he clearly has no need to drink but accepts anyway, like a courtesy older than either of you.

"The seal between this world and mine isn't a wall. It's a held breath — something actively maintained, not passively fixed in place. Three centuries ago, your bloodline's founder discovered that binding me to a Warden, generation after generation, was the only way to keep that breath held without either destroying me or letting what's behind the seal through entirely." His eyes, wrong-colored and steady, don't leave yours. "I don't love this arrangement. I don't hate it either, most days. It simply is, the way weather is."

"That's not an explanation. That's a history lesson."

"Fair." Something almost wry in it. "The practical shape of the bond is this: proximity, mostly. You don't have to like me. You don't even have to trust me. You have to allow the bond to exist — refuse it entirely, and the seal starts to fail within days, not centuries. Your mother spent thirty years despising the arrangement and it held perfectly well regardless."

"So I don't actually have a choice."

"You have every choice in how you carry it," he says, quiet. "Just not whether it exists at all."`,
      choices: [
        { label: "Guard yourself — treat this as duty and nothing else", next: "n4a" },
        { label: "Let yourself actually see him as more than the seal's terms", next: "n4b" }
      ]
    },

    n3_pressed: {
      chapter: "Three — The One Who Refused",
      text: `"Tell me what happens," you say, "if I refuse. Has anyone?"

Something in his expression goes carefully still. "Once. Four generations back. She refused the bond outright — barred me from the grounds, tried to hold the seal through will alone." He doesn't look away from you while he says it. "It took eleven days. The seal doesn't fail cleanly. It frays, and what comes through the fraying isn't whole, isn't sane, and isn't easily put back. She died closing it herself, alone, because there was no one left bound to help her do it safely."

"You're telling me that to scare me into accepting."

"I'm telling you because you deserve the whole truth before you decide anything, and because I would rather you resent me for honesty than thank me for a comforting lie that gets you killed the way she was." He meets your eyes, unflinching. "The bond isn't a cage, whatever the old stories tell you. It's proximity, allowance, nothing more demanding than that. You don't have to like me. You don't even have to trust me. You have to let the bond exist."

"And if I do?"

"Then we find out together what three centuries of this arrangement actually looks like, carried by someone who isn't performing hatred for a demon she's never actually met."`,
      choices: [
        { label: "Guard yourself — treat this as duty and nothing else", next: "n4a" },
        { label: "Let yourself actually see him as more than the seal's terms", next: "n4b" }
      ]
    },

    n4a: {
      locked: true,
      chapter: "Four — Duty, Nothing Else",
      text: `"Fine," you say. "The bond exists. Proximity, allowance, whatever you need it to be called. That doesn't make us anything to each other beyond the arrangement."

Something flickers behind his wrong-colored eyes — not hurt exactly, something older and more practiced, the look of someone long since resigned to being kept at exactly this distance. "Understood. I won't ask for more than the bond requires."

"I mean it. I didn't ask for this inheritance. I'm not going to pretend it's anything other than duty."

"You don't have to pretend anything with me." His voice goes carefully even. "I've done three centuries of this with women who felt exactly as you do. I know how to exist at the edge of a life without demanding the center of it."

He doesn't push past the line you've drawn. Keeps precisely the distance the bond requires and not a hair closer, present at the grounds each dusk like the seal demands, gone again before you'd have to acknowledge him as anything more than an obligation.

You tell yourself that's exactly what you wanted.

Some nights, you almost believe it.`,
      choices: [
        { label: "Learn what the seal is actually protecting against", next: "n5", setFlag: { name: "guarded", value: true } },
        { label: "Ask what three centuries of this has actually cost him", next: "n5_pressed", setFlag: { name: "guarded", value: true } }
      ]
    },

    n4b: {
      locked: true,
      chapter: "Four — More Than the Terms",
      text: `You don't hold him at the distance duty would allow. It surprises you as much as it seems to surprise him — some part of you deciding, somewhere over cooling tea at your own kitchen table, that a demon who told you the hardest truth instead of the comfortable one had earned more than wary tolerance.

"You don't have to perform this as easier than it is," he says, quiet, watching you with something careful and unfamiliar in his expression — like a man unused to being looked at as anything other than an arrangement.

"I know what I'm supposed to feel about you. Three centuries of my bloodline felt it before me."

"You're not obligated to inherit their feelings along with the bond." Something almost raw in his voice now. "I'd rather you felt whatever's actually true for you, even if that's still wariness. Especially if it's wariness. I just don't want you performing hatred you don't feel because it seems like what a Warden is supposed to do."

His hand, when it finds yours across the table, is warmer than you expect from something the stories call monstrous. Neither of you pulls back.

"Tell me everything the bond actually requires," you say eventually. "Not the version my mother might have simplified for me. All of it."

"You'll have it," he promises. "Every piece."`,
      choices: [
        { label: "Learn what the seal is actually protecting against", next: "n5", setFlag: { name: "guarded", value: false } },
        { label: "Ask what three centuries of this has actually cost him", next: "n5_pressed", setFlag: { name: "guarded", value: false } }
      ]
    },

    n5: {
      locked: true,
      chapter: "Five — What's Actually Behind the Seal",
      text: `He takes you to the wardstones at dusk, where the seal itself hums beneath the ground like something breathing in its sleep.

"It was never really me the seal was built against," he admits, and for the first time since your doorway, something like old grief moves through his voice. "I'm the keeper of it, not the threat. What's actually behind the seal is something I helped your bloodline's founder trap there three centuries ago — something I couldn't destroy alone, and could only hold shut by binding myself to a human line willing to renew the working generation after generation."

"So the stories about you are wrong."

"The stories about me being the danger, yes. The stories about the cost being real — those are accurate." He holds your gaze, steady. "Every generation, the bond needs to be renewed by choice, not obligation. That's the part your mother's generation stopped telling clearly, because 'choice' sounded too much like something a Warden could refuse. I need you to understand: if you renew this only because you feel cornered into it, the seal will know. It only holds on genuine will, not performed duty."

The wardstones pulse, patient, ancient, listening.

"So tell me plainly," he says. "Whatever's actually true for you. Not the version that sounds like what a Warden's supposed to say."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n5_pressed: {
      locked: true,
      chapter: "Five — Three Centuries",
      text: `"What has this actually cost you?" you ask, before he leads you to the wardstones. "Three hundred years of this. Truthfully."

He's quiet long enough that you think he won't answer. "Every generation, I watch a woman I've come to know die, and I begin again with someone who's inherited every reason to fear me and none of the context that might soften it. That's the cost. Not the binding itself — the losing, over and over, of the only people who ever saw past what the stories say I am."

"That's not an answer about the seal. That's an answer about you."

"You asked what it cost me. I gave you the honest ledger, not the tidy one." Something raw in his voice now. He leads you to the wardstones, where the ground hums like something breathing in its sleep. "The seal was never built against me. I'm the keeper, not the threat — what's actually trapped there is something I helped your bloodline's founder contain, and can only keep shut by a bond renewed on genuine will, not obligation. If you only renew this because you feel cornered, the seal will know. It only holds on choice."

"So tell me plainly," he says. "Whatever's true for you. Not the version that sounds like duty."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n6_final_hold: {
      locked: true,
      chapter: "Six — What Duty Doesn't Require",
      text: `"What's necessary," you say, "is that the seal holds and whatever's behind it stays behind it. That's what's true. I'm not going to manufacture more than that just to satisfy the working."

He studies you a long moment, something behind his wrong-colored eyes settling into quiet resignation rather than surprise.

"Understood," he says. "Then let's see if duty alone is enough to hold three centuries of this together."`,
      choices: [
        { label: "Renew the bond on those exact terms", branchOn: { flag: "guarded", ifTrue: "n6_severance", ifFalse: "n6_reckoning" } },
        { label: "Refuse the inheritance and find another way to seal it", next: "n6_unbound" }
      ]
    },

    n6_surrender: {
      locked: true,
      chapter: "Six — Surrender",
      text: `"The truth," you say, "is that I stopped seeing this as an inheritance somewhere around the moment you told me the honest cost instead of the comfortable version. I'm not renewing this bond out of duty. I'm choosing you, plainly, the way the seal apparently needs someone to."

He crosses the space between you in two steps, and this time there's no seal requiring it, no wardstones demanding proximity — just his hands finding your face like a man memorizing something he never let himself expect to keep.

"Say that again," he murmurs, "where the wardstones can hear every word of it."

You do — standing where three centuries of your bloodline stood before you, nothing held back, and the ground beneath you settles into something different from mere containment: not a held breath anymore, but something chosen, willingly renewed. The seal doesn't just hold. It deepens, certain in a way three centuries of grudging duty never made it.

"Stay," he says. Not the bond's requirement. His own question, entirely.

"Try and make me leave," you answer, and mean every unbound word of it.`,
      ending: true,
      tag: "Ending: Surrender"
    },

    n6_reckoning: {
      locked: true,
      chapter: "Six — Reckoning",
      text: `"The truth," you say, "is that I don't see you as the threat my bloodline was built against anymore. I'm not going to pretend that's nothing. But I'm also not going to pretend I understand yet what three centuries of this actually makes us."

It's not the surrender the working might have hoped for. You watch him brace for the seal to reject it as insufficient.

Instead, the wardstones settle anyway — slower, more careful, but genuine, accepting complicated honesty in place of a cleaner declaration. The bond renews, held now on real will rather than inherited duty.

"That shouldn't have been enough," he admits afterward, something like wonder in his voice.

"Maybe the working prefers honesty to theater."

"Maybe." A faint, real almost-smile. "We don't have to decide the rest of it tonight. The bond holds either way now. Whatever's between us can take whatever time it actually needs to become something neither of us has to force."

It isn't the ending where three centuries of complicated history resolves in a single dusk. It's the one where the seal holds, the truth was enough, and whatever comes next gets built slowly, on terms you actually chose instead of inherited.`,
      ending: true,
      tag: "Ending: Reckoning"
    },

    n6_severance: {
      locked: true,
      chapter: "Six — Severance",
      text: `You renew the bond on guarded terms, careful and plain, and the wardstones test it the way old magic tests anything half-offered.

"It's not enough," he says, understanding it a moment before the ground does. "The working needs genuine will, not obligation dressed as one—"

The seal strains. Something on the other side of it presses against the fraying edge, and you fight — Warden training finding uses your mother never got to teach you fully — until between the two of you, the immediate breach is beaten back and sealed again, holding, if only barely.

But the bond itself doesn't settle into what it could have been. Can't, built as it was on duty held at careful arm's length instead of true choice.

"It'll hold," he says afterward, the length of the wardstones between you. "For your lifetime, probably. Not the way it could have, if you'd meant it fully."

"I did what the inheritance required."

"You did." No accusation in it, which somehow makes it worse. "That was always going to be enough to hold the seal. I think we both know it was never going to be enough for anything past that."

No dramatic final argument — just two people who did the necessary thing and left everything else exactly where three centuries of duty left it: unresolved, guarded, chosen with open eyes instead of avoided.`,
      ending: true,
      tag: "Ending: Severance"
    },

    n6_unbound: {
      locked: true,
      chapter: "Six — Unbound",
      text: `"No," you say, steadier than you expect. "I'm not renewing a three-century bond I don't actually mean, not even for the seal. There has to be another way to hold it, and I'm going to find one instead of inheriting yours."

He doesn't argue. Doesn't try to talk you back into the working. Just watches you with something that might be respect, might be quiet grief at a door closing that's been open three hundred years.

"There might be another way," he admits finally. "Older, harder, uncertain — a different kind of containment that doesn't require a Warden's bond at all. I'll help you find it, if you'll let me. Not because the seal demands it of me. Because I'd rather see you choose a different path entirely than watch you renew this one out of obligation alone."

You don't have an answer beyond accepting the offer. The two of you begin the harder, uncertain work of finding a containment that doesn't cost you your whole life to something you never chose — the wardstones quiet behind you, unresolved, and for the first time in your bloodline's three centuries, entirely a choice made freely instead of inherited.

"For what it's worth," he says, walking beside you into the dark, "I'd rather help you find a harder freedom than watch you settle for an easier chain."`,
      ending: true,
      tag: "Ending: Unbound"
    }
  }
};
