// Ashbound — fifth title. Same engine contract: diamond branch
// structure, free through "n3" tier, locked from "n4" onward, 4 endings
// gated by the guarded/trust flag.

export const ashbound = {
  startNode: "n1",
  nodes: {

    n1: {
      chapter: "One — The Terms of Peace",
      text: `Two hundred years of war between your house and his ends, apparently, with a piece of paper and your signature on it.

"An alliance marriage," your mother says, like she's announcing the weather rather than your entire future. "Both houses have bled themselves nearly to ash. The councils agree it ends now, or it ends both bloodlines entirely."

"And 'ends now' means marrying the heir of the house that burned three of our border towns."

"It means marrying the heir of the house whose towns *your* father burned in return, before you get sanctimonious about it." Her voice doesn't soften. "You've spent your whole life being told what he is. I'd suggest meeting him before you finish deciding."

You meet him three days later, in the scorched neutral ground between territories, both of you flanked by guards who'd clearly rather be doing anything else. He's exactly what two hundred years of propaganda promised: sharp-eyed, dragon-marked down one forearm in scales the color of his house's banners, radiating the particular arrogance of someone who's never once had to apologize for anything.

"So," he says, looking you over with unhurried, infuriating thoroughness. "You're the one I'm supposed to save two centuries of bloodshed by marrying."

"Try not to sound thrilled about it."

Something that might be the ghost of a real smile crosses his face. "Wouldn't dream of it."`,
      choices: [
        { label: "Refuse to play nice — make him work for basic civility", next: "n2a" },
        { label: "Decide to be genuinely, disarmingly polite", next: "n2b" }
      ]
    },

    n2a: {
      chapter: "Two — Making Him Work For It",
      text: `"I'm not going to pretend this is anything other than a transaction," you say, arms crossed. "You get an alliance. I get to stop watching my people die. Let's not perform anything warmer than that."

"Fair enough." He doesn't seem remotely offended — if anything, something in his posture eases, like bluntness is a language he actually prefers to diplomacy. "Honestly, it's a relief. I was fully prepared for two hours of forced pleasantries."

"You're not going to argue that we should try to like each other?"

"I didn't say that." His eyes glint, entirely too pleased with himself. "I said I wasn't going to pretend liking each other is required by the contract. Whether it happens anyway is a separate matter I intend to leave completely up to you."

"That's insufferably confident of you."

"I've been told." He offers a mock-bow, somehow managing to make it both mocking and genuinely respectful at once. "For what it's worth — I didn't burn your border towns personally. I was eleven. I'd rather you judge me on what I actually do from here, not what my father did before I had any say in it."`,
      choices: [
        { label: "Accept the terms and move to practical matters", next: "n3" },
        { label: "Press him on what he actually wants from this", next: "n3_pressed" }
      ]
    },

    n2b: {
      chapter: "Two — Disarming Politeness",
      text: `"I'm not going to spend two centuries of inherited grudge on someone who wasn't even born for most of it," you say, offering your hand properly, the way the old treaties technically require. "I'd rather start from something closer to even ground."

He blinks — actually blinks, like genuine civility wasn't on the list of things he'd braced for. "That's unexpectedly generous, given what my house's banners probably mean to you."

"It's practical. Two hundred years of hating you on principle hasn't saved a single border town. I'm willing to try something else."

"Careful," he says, taking your hand, something warmer than diplomacy in his grip. "Keep being reasonable like that and you'll ruin my entire understanding of how this was supposed to go."

"How was it supposed to go?"

"Badly. Loudly. With significantly more shouting." A real smile now, unguarded for exactly a moment before he visibly reins it back in. "I confess I don't entirely know what to do with someone from your house choosing decency first. I'll need a moment to recalibrate."

"Take your time," you say. "We have, apparently, the rest of our lives for you to catch up."`,
      choices: [
        { label: "Accept the terms and move to practical matters", next: "n3" },
        { label: "Press him on what he actually wants from this", next: "n3_pressed" }
      ]
    },

    n3: {
      chapter: "Three — The Practical Matters",
      text: `The practical matters, it turns out, are considerable: a shared border fortress neither house trusts the other to hold alone, a wedding date set by council rather than either of you, and a clause in the treaty stating plainly that if the marriage fails, the war resumes exactly where it left off.

"No pressure," he says dryly, reading the clause over your shoulder.

"Whoever wrote this clearly never expected either of us to survive the honeymoon, let alone the politics."

"Small mercies — at least they're honest about the stakes." He leans back, studying you with something more assessing now than the earlier performance of arrogance. "I meant what I said at the border. I'm willing to actually try this, not just tolerate it for the cameras and the councils. But I'd rather know now if you're only here because your mother left you no real choice."

"Isn't that true of both of us?"

"Probably." Something almost vulnerable flickers through the usual sharpness. "I'd still rather know which one of us is actually choosing this, once the choosing's allowed to matter."`,
      choices: [
        { label: "Guard yourself — treat this strictly as duty", next: "n4a" },
        { label: "Admit you might actually want this to work", next: "n4b" }
      ]
    },

    n3_pressed: {
      chapter: "Three — What He Actually Wants",
      text: `"What do you actually want from this?" you ask. "Beyond the treaty requiring it."

He considers the question longer than you expect from someone so quick with everything else. "Peace that outlasts both of us, honestly. I grew up watching my father treat the war as inheritance rather than tragedy — something to be managed, passed down, never actually ended. I don't want that for whatever comes after us."

"That's a very diplomatic answer."

"It's also true, which I realize doesn't automatically follow from diplomatic." A flicker of real irritation, quickly smoothed over. "You asked. I answered honestly instead of performing whatever you expected my house to say."

The practical matters, once you move to them, are considerable: a shared border fortress, a council-set wedding date, a treaty clause stating plainly that if the marriage fails, the war resumes exactly where it left off.

"No pressure," he says dryly, reading it over your shoulder.

"I'd rather know now," you say, "whether you're actually choosing this, or just performing acceptance because the alternative is your father's war continuing."

"Both, probably, if I'm honest. I'd like the chance to find out which one wins, once the choosing's allowed to actually matter."`,
      choices: [
        { label: "Guard yourself — treat this strictly as duty", next: "n4a" },
        { label: "Admit you might actually want this to work", next: "n4b" }
      ]
    },

    n4a: {
      locked: true,
      chapter: "Four — Strictly Business",
      text: `"Duty," you say. "That's what this is, and I'd rather we both stay honest about that instead of performing something warmer for the councils."

Something shutters behind his eyes — not hurt exactly, something more practiced, the look of a man who expected exactly this and prepared for it anyway. "Understood. Duty, then."

"I mean it. I'm not going to pretend an arranged peace is a love match."

"I never asked you to." His voice goes carefully light, diplomatic in a way that feels newly distant after the honesty at the border. "I'll hold up my end of the treaty. You won't find me demanding more than the contract requires."

He keeps precisely that promise over the following weeks — courteous at council meetings, present at the required functions, gone the moment duty allows it. You tell yourself the distance is a relief, exactly what you asked for.

Some evenings, watching him leave without lingering, you're less certain that's true.`,
      choices: [
        { label: "Learn what's actually at stake if the fortress falls", next: "n5", setFlag: { name: "guarded", value: true } },
        { label: "Ask what his father's war actually cost him personally", next: "n5_pressed", setFlag: { name: "guarded", value: true } }
      ]
    },

    n4b: {
      locked: true,
      chapter: "Four — Choosing It",
      text: `"I might actually want this to work," you admit, surprising yourself as much as him. "Beyond the treaty. Beyond what either council expects from us."

Something shifts in his expression — guarded hope, carefully controlled like a man unused to being handed something he's not bracing to lose immediately. "That's either very brave or very foolish of you to say plainly."

"Probably both."

"I'd rather both, honestly, than the polite fiction we're apparently supposed to perform instead." He crosses the space between you, unhurried, giving you every chance to step back if you want to. You don't. "For what it's worth — I want this to work too. Not just the treaty. This."

His hand, when it finds yours, carries none of the earlier performance, just something steadier and more real than either of you quite expected from a marriage neither of you chose the timing of.

"Tell me what's actually at stake," you say eventually, not moving. "Everything. Not the treaty's version."

"You'll have it," he promises. "All of it."`,
      choices: [
        { label: "Learn what's actually at stake if the fortress falls", next: "n5", setFlag: { name: "guarded", value: false } },
        { label: "Ask what his father's war actually cost him personally", next: "n5_pressed", setFlag: { name: "guarded", value: false } }
      ]
    },

    n5: {
      locked: true,
      chapter: "Five — What the Fortress Actually Guards",
      text: `He takes you to the shared border fortress at dusk, where the old wards between the two houses' territories still hum faintly, decades of accumulated grudge worked into the stone itself.

"It was never just a border post," he admits, and for the first time since the neutral ground, something like real fear moves through his voice. "The fortress sits on the old fracture line between our houses' founding territories — the same fault our ancestors fought the first war over, three centuries back. If the alliance fails and the fortress falls to open conflict again, it won't just restart our two houses' war. It'll wake every old claim buried under it. Six houses, not two."

"That's not what the treaty said."

"The treaty simplified it, because the truth terrifies council members into paralysis rather than cooperation." He holds your gaze, unflinching. "I should have told you the full stakes from the border meeting. I didn't, because I was afraid the scale of it would make you refuse before you'd had a chance to actually know me."

The old wards pulse, ancient, listening.

"There's still a way to hold this properly," he says. "But it needs both of us genuinely committed, not performing alliance for the cameras. Whatever's true for you — I need to hear it plainly now."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n5_pressed: {
      locked: true,
      chapter: "Five — What His Father's War Cost",
      text: `"Tell me honestly," you say. "What did growing up in his war actually cost you?"

He's quiet long enough you think he won't answer. "My brother. Not to your house's blade — to my father's obsession with the war outlasting him. He pushed my brother into a border skirmish two years ago that a functioning peace would have made unnecessary. I've spent every day since trying to be the version of heir who ends this instead of inheriting it."

"You've never told a council that."

"Councils want strategy, not grief." Something raw in his voice now. He leads you to the fortress at dusk, where old wards hum with decades of accumulated grudge. "This place sits on the fracture line our houses first fought over, three centuries back. If the alliance fails, it won't just restart our war — it wakes six houses' worth of buried claims. The treaty simplified that because the truth paralyzes councils rather than uniting them."

"So what actually holds it?"

"Genuine commitment. Not performance." He meets your eyes. "Whatever's true for you, I need it now. Plainly."`,
      choices: [
        { label: "Open your heart completely", next: "n6_surrender" },
        { label: "Hold the line — say only what's necessary", next: "n6_final_hold" }
      ]
    },

    n6_final_hold: {
      locked: true,
      chapter: "Six — What Duty Doesn't Cover",
      text: `"What's necessary," you say, "is that the fortress holds and six houses' worth of buried war stays buried. That's what's true. I'm not going to manufacture more than that to satisfy the wards."

He studies you a long moment, something behind his sharp eyes settling into quiet resignation rather than surprise.

"Understood," he says. "Then let's see if duty alone is enough to hold three centuries of fracture together."`,
      choices: [
        { label: "Commit to the alliance on exactly those terms", branchOn: { flag: "guarded", ifTrue: "n6_severance", ifFalse: "n6_reckoning" } },
        { label: "Refuse the marriage and seek another peace entirely", next: "n6_unbound" }
      ]
    },

    n6_surrender: {
      locked: true,
      chapter: "Six — Surrender",
      text: `"The truth," you say, "is that somewhere between the border meeting and this fortress, this stopped feeling like a treaty I was trapped inside. I'm not committing to this alliance out of duty. I'm choosing you, plainly, the way six houses' worth of old fracture apparently needs someone to."

He crosses the space between you in two steps, and this time there's no council requiring it, no treaty demanding proximity — just his hands finding your face like a man who spent two years grieving a brother and never let himself expect to be handed something worth keeping instead.

"Say that again," he murmurs, "where every old ward on this fortress can hear it."

You do — standing where three centuries of fracture nearly reopened, nothing held back, and the old wards settle into something different from mere containment: not a held breath anymore, but something chosen, willingly renewed. The fortress doesn't just hold. It deepens, certain in a way two centuries of grudging treaty never made it.

"Stay," he says. Not the treaty's requirement. His own question, entirely.

"Try and make me leave," you answer, and mean every unbound word of it.`,
      ending: true,
      tag: "Ending: Surrender"
    },

    n6_reckoning: {
      locked: true,
      chapter: "Six — Reckoning",
      text: `"The truth," you say, "is that I don't see you as my house's enemy anymore. I'm not going to pretend that's nothing. But I'm also not going to pretend I fully understand yet what this makes us, beyond the treaty."

It's not the surrender the old wards might have hoped for. You watch him brace for it to be refused as insufficient.

Instead, the fortress settles anyway — slower, more careful, but genuine, accepting complicated honesty in place of a cleaner declaration. The alliance holds, six houses' worth of buried claims settling back into dormancy.

"That shouldn't have been enough," he admits afterward, something like wonder in his voice.

"Maybe old wards prefer honesty to theater."

"Maybe." A faint, real almost-smile. "We don't have to decide the rest of it tonight. The alliance holds either way now. Whatever's between us can take whatever time it actually needs to become something neither of us has to force for the councils."

It isn't the ending where two centuries of war resolves in a single dusk. It's the one where the fortress holds, the truth was enough, and whatever comes next gets built slowly, on terms you actually chose instead of a council's contract.`,
      ending: true,
      tag: "Ending: Reckoning"
    },

    n6_severance: {
      locked: true,
      chapter: "Six — Severance",
      text: `You commit to the alliance on guarded terms, careful and plain, and the old wards test it the way ancient magic tests anything half-offered.

"It's not enough," he says, understanding it a moment before the fortress does. "It needs genuine commitment, not duty dressed as one—"

The fracture strains. Something in the old stone presses against decades of accumulated grudge, and you fight — both of you, dragon-fire and old training finding uses neither of you expected to need this soon — until between the two of you, the immediate breach is beaten back and resealed, holding, if only barely.

But the alliance itself doesn't settle into what it could have been. Can't, built as it was on duty held at careful arm's length instead of true commitment.

"It'll hold," he says afterward, the length of the fortress between you. "For our lifetimes, probably. Not the way it could have, if we'd meant it fully."

"I did what the treaty required."

"You did." No accusation in it, which somehow makes it worse. "That was always going to be enough to hold the fortress. I think we both know it was never going to be enough for anything past that."

No dramatic final argument — just two people who did the necessary thing and left everything else exactly where two centuries of war left it: unresolved, guarded, chosen with open eyes instead of avoided.`,
      ending: true,
      tag: "Ending: Severance"
    },

    n6_unbound: {
      locked: true,
      chapter: "Six — Unbound",
      text: `"No," you say, steadier than you expect. "I'm not committing to an alliance I don't actually mean, not even to hold six houses' worth of fracture shut. There has to be another way to find peace, and I'm going to look for it instead of performing this one."

He doesn't argue. Doesn't try to talk you back into the treaty. Just watches you with something that might be respect, might be quiet grief at a door closing that two centuries of war built.

"There might be another way," he admits finally. "Harder, slower, uncertain — a peace that doesn't require either of us to marry into it. I'll help you find it, if you'll let me. Not because the councils demand it of me. Because I'd rather see you choose an honest peace than watch you settle for a convenient one."

You don't have an answer beyond accepting the offer. The two of you begin the harder, uncertain work of finding an ending to two centuries of war that doesn't cost either of you a marriage neither of you chose — the old fortress quiet behind you, unresolved, and for the first time in either house's history, entirely a choice made freely instead of inherited.

"For what it's worth," he says, walking beside you into the dark, "I'd rather help you find a harder truth than watch us both settle for an easier lie."`,
      ending: true,
      tag: "Ending: Unbound"
    }
  }
};
