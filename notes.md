# Arrival language

A map from english words to symbols inspired by the film, and Ted Chiang's short-story, `Arrival`

# TODO

- [x] Proof of concept
- [x] Design prototype alphabet
- [x] Ability to place blob at larger radius
- [x] First point of line should not jitter
- [x] Line jitter should be random walk
- [x] Make circles into ellipse

- [ ] Add effects for letter frequency
    - [ ] 1 - 3 lines inside
    - [ ] 1 - 3 dots inside

- [ ] Some large circles should have medium circles on either side
    - to create an ellipse like shape
- [ ] Some medium circles should have small circles on either side
    - to create an ellipse like shape
- [ ] Add noise like small dots and lines
    - [ ] Could be a slightly fainter color

## Letters

A pattern of circles, ovals, and lines distributed around the circle. Circles, ovals, round end-cap lines. All black, so they merge together

## Multiple letters

Are indicated by dots or some kind of repeating mark near the drawing for that letter

## Foundation

Foundation is a circle (most of the time) with a gap somewhere. Gap faces opposite the starting letter for the word.

## Foundation Design

Circular line with some roughness to it.

## One Circle is One Word

Start with circles that mean just one word. Sentence circles are too complicated

Note: some good ideas toward the bottom. There’s enough here to get started on an implementation.

## Example Letter

For example, “a” is a line sticking horizontally out the right side of the circle, and there’s a few dots next to it to represent multiple “a” in the sentence

## Line Design

D3 can take an array of points and render a thick/smooth line with an end cap, so a `line` can be a loose collection of consecutive points with smoothing applied to the line through them

## Circle Design

A `circle` can be a collection of points with some random shuffling (in/out), a smooth line, and fill

## Challenge Question

Give a few circles, and they’re meaning. Then a new circle and ask “what’s the meaning”. People must figure out how to represent each letter. Then, what letters are in the new symbol, and finally unscramble the sentence


# More ideas

Direction of opening or lack of could indicate the number of words in the sentence?

Lay it out flat and then bend it

Can I make a program that takes something flat and bends it into a circle

Letters are degrees. Each circle is a sentence.

A system of points that emit heat. Colour pixels that come close to enough dots

Pass rectangular characters through some sort of filter. So, a rigid circle character fills in pre placed fluid shaped, but only if there is enough overlay between the filled in rectangles, and the fluid shapes

Each letter is some circles and lines. Each sentence is a mush of those letters into a circle
