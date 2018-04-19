1. "I will have the UI correctly output requests to my server and read back in the midi file and play it. I will use a MIDI file parser to do so and possibly socket.io for faster reads and writes."


2. I am halfway there. I didn't have a lot of time to spend the midi file playing itself, since I was figuring out how to first write the notes string ("__x___xx") in my app and this required more of my components to rely on redux. There was heavy refactoring.

I have my server returning back midi file data, but because I had assumed react-orchestra was a stable package that could play back midi files, I am now in search of another alternative to parse it and play it, with a specified sound (the sound being the selected synth sound). If there is no package out there, what I will have to do is write the raw midi file data to a file, and play it using an HTML audio component. This is one question I had for you, if you know of any javascript libraries that deal with midi files and playing them back.

I have not found anything concerning what sound it will use when I do play the midi file, since the midi file itself just determines the notes, but not the actual sound to be used. If that's the case, I might have to write an mp3 file with a specified sound.


3. What I had set out to do was polish the pipeline and make sure the app does not reach into an odd state. Fortunately, I've been testing my app quite often and have made sure I've taken care of all possible cases thanks to redux. I can use this time to finish the main point of the app, which was to use server-side midi file creation in order to record music, without having to do it on the webapp itself. In the future, this could turn collaborative, where users can make music together in realtime.


4. Screenshots in checkpoint2 folder.