```sh
npm i -g red-gen  
```

Create A Feature Folder.

Run this command from inside that folder -

```javascript
red-gen <Component Name>
```

Like -

```javascript
red-gen Button
```

The `script` will create -
 * `Button.js`
 * `ButtonContainer.js`
 * `ButtonAction.js`
 * `ButtonReducer.js`
 * `ButtonThunk.js`
 * `ButtonSelector.js`
 * `ButtonTypes.js` 
 * `ButtonStyle.js`
 * `index.js`

And they will contain some structured boilerplate code.

😃

If component name includes more than one word, then use dash(-) between them

Like -

```javascript
red-gen login-button
```

The `script` will create -
 * `LoginButton.js`
 * `LoginButtonContainer.js`
 * `LoginButtonAction.js`
 * `LoginButtonReducer.js`
 * `LoginButtonThunk.js`
 * `LoginButtonSelector.js`
 * `LoginButtonTypes.js` 
 * `LoginButtonStyle.js`
 * `index.js`