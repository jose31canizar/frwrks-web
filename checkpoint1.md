1. "I will implement the design patterns within the client so that I reuse filter objects and build a factory class for blocks. I will store the state of how many ensembles, tracks, and instrument racks are made using react-redux."


2. What I actually accomplished was that I created the instrument class so that you can choose what instrument sound the keyboard plays. I also moved the ensembles data and the counters data all to redux, creating one single store for the state of the whole app. Additionally, I had to go back and fix my state machine for Sequencer.js in componentWillReceiveProps (very time consuming and not the easiest thing to understand with all the state variables).

So I used one design pattern in that I have a singular instrument class, an example of the observer pattern, in that it waits for an onpress event to occur on any option, and notifies the keyboard of this change.

In updating the state machine for the sequencer class, I realized that my counterMachine singleton class was not a true singleton, and was being instantiated many times (once per sequencer). Now, I've made it a prop of every sequencer to read from, so that there is one single source of truth of what sequencers are playing and whether the counter is playing or not.

In learning redux, I realized that the componentWillReceiveProps function in Sequencer.js is a very difficult way to handle things, and haven't thought of an alternative yet. The function is the place where it reads the result of an onPress event on the track (whether it should be playing or not (newProps.playing)) and dispatches actions but it is also the same place that gets updated after a redux action. So it is at risk of circular calls and only avoids this with branching. It would be nice to separate this somehow, it's a concise way of creating the state machine however, and minimizes code, but even I get very confused at how it works in all five cases.

3. "I will have the UI correctly output requests to my server and read back in the midi file and play it. I will use a MIDI file parser to do so and possibly socket.io for faster reads and writes."

What I said I had to do is what I will actually do here. I will first have to figure a good place to write my rhythm string from the keyboard (probably the keyboard itself or the configuration page and using a redux action to send that string over to an action that talks to my server with a post request). I will then see if I get it there, and then use ScribbleTune to write to a MIDI file. I looked at the ScribbleTune API, and it looks like it writes to a MIDI file asynchronously which is good, but it would be good if it returned a promise so that I don't have to check if the MIDI file exists (or if its done yet) before sending it over.

Merging two tracks will be a stretch feature for when I have the previous feature working. Two tracks with different rhythms will fill in each others gaps to make one single rhythm and pick the first track as the sound for it.


4. Screenshots attached.