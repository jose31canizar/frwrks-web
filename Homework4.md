1. WHAT I PLANNED
The biggest change was that I shifted over to web instead of native. The two possible ways of getting audio to work (not just recording and playing audio, but creating sound as in from a synthesizer) using React-orchestra or a webview attached with Tone.js turned out not to be feasible. Using Tone.js to produce sound was much easier to do in web.

I had planned to be working on the server with the ScribbleTune API and working with GET and POST requests from my app to the server. ("I will have my server written so that it takes as input a pattern and a melody so that it outputs the appropriate midi file. I can test this with Ableton to see if it is actually the right midi file.")

2. WHAT I ACCOMPLISHED
I am not concerned that I did not work on the server because working on the front end actually gave me a lot of practice in working with references, composition vs. inheritance, and the singleton design pattern in the context of React. I mostly took advantage of reusing a lot of my components and made really concise code (one CounterMachine that handles all of the notes played on the tracks, one Sequencer that gets reused multiple times). I feel that I have applied Object-Oriented design patterns pretty well, and continue to better my code by the next deadline.

Currently what I did was I created a bunch of sequencers (basically the component in each track that plays the metronome over 16 beats) and synchronize when each one played if they were close enough to the same beat. Redux helped me simplify this state management of when each one was playing or not and what beat each one was on.


3. WHAT I HAD PLANNED FOR NEXT DEADLINE
"I will implement the design patterns within the client so that I reuse filter objects and build a factory class for blocks. I will store the state of how many ensembles, tracks, and instrument racks are made using react-redux."

I have actually gotten a head start in implementing redux in my app, so this next step will be a breeze. I will do this on top of accomplishing what I wanted to do with the server. Now that my app has these tracks that play on time together, I need to:

>attach a custom sound to each track.
>visualize the notes I'm playing on the configuration panel.
>record notes by creating a string of patterns from the notes I'm playing.
>send this string to the server with a POST request
>wait to receive a midi file.
>play that midi file with the sound I recorded it with.

An example pattern is "__xx__x_" where underscores are silence and x's are the beats. The ScribbleTune uses this pattern to create its midi files, so it's very easy to work with.

4. Screenshot is Homework4