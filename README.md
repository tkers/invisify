# invisify.js

Simple (and opinionated) script to convert a Markdown file into an interactive _InvisiClues_ style HTML page.

It basically does 3 things:

1. Prefix all `** bold **` text with a prompt cursor (`>`)
2. Convert `- list items` into a specific structure that hides clues
3. Inject the output into a template HTML file

You can run the script by invoking:

```sh
invisify clues.md template.html output.html
```

## Examples

Check out a [basic example of the output](https://tkers.github.io/invisify), the result of converting [this source file](example/clues.md).

Or, for a more customised version, the [InvisiClues page](https://tkers.dev/thornfell) of my PunyComp entry [Thornfell Manor: 1984](https://tkers.itch.io/thornfell).

## Template

The template contains the CSS necessary to hide/show the clues. The relevant selectors are:

- `label span` (a hidden clue)
- `label:hover span` (a hovered clue)
- `label :checked + span` (a revealed clue)

Inside the template, `{{clues}}` marks the spot where the output of the script is injected.

## Technical details

The structure that allows the clues to be hidden (and revealed when clicked) looks like follows:

```html
<li>
  <label>
    <input type="checkbox" />
    <span>Clue text</span>
  </label>
</li>
```

This allows the clues to be hidden using a CSS rule:

```css
label span {
  color: transparent;
}
```

...and revealed when it is clicked:

```css
label :checked + span {
  color: #000000;
}
```

Lastly, we hide the checkbox that allows the toggling behavior, and add a background-color to the label so there is something visible to click on:

```css
input[type='checkbox'] {
  display: none;
}

label span {
  background-color: #ccc;
}
```
