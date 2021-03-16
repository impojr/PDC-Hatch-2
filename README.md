# PDC-Hatch-2
This is an app built for the Fitbit Versa 3/Fitbit Sense that lets you hatch and evolve Pokemon on your wrist!
As this is not my IP, I am not able to upload this onto the GAM, but follow these instuctions to deploy the app on your device as a developer.

## How to Install
(taken from the sdk-oauth tutorial)

1. You must first register a Web Application on
   [dev.fitbit.com](https://dev.fitbit.com/apps/new) to get an OAuth ID and
   secret. Configure the application as:

- OAuth 2.0 Application Type: **Personal**
- Callback URL:
  **https://app-settings.fitbitdevelopercontent.com/simple-redirect.html**
  
2. Download the PDC-Hatch minified files and create an empty project in Fitbit Studio. Copy over all the files and folders in the minified folder.
*the minified .js looks like jibberish, but it's just making the app as small as possible so it doesn't cause memory overflow errors on your device*

2. Enter your **OAuth 2.0 Client ID** and **Client Secret** into
   `settings/index.jsx` (override the existing values for client and secret id there)

3. After installing the project from Fitbit Studio, you need to login to the
   Fitbit Web API using the settings page within the Fitbit mobile application
   
## Connecting to the web API

If you try to sync your app without giving the correct permissions, you will be directed to the error screen.
To fix this, go to:
your Fitbit app > click the versa icon on the top left > Developer Menu > PDC Hatch (under sideloaded apps) > settings > login > follow the prompts.

This will grant permissions for a limited time. You will need to repeat this process every time the permissions expire.

## How to Play

There is no tutorial in PDC, the limited memory space really doesn't allow it. So, here's how to use PDC:

### Syncing Steps

Synchronizing steps isn't too much of a hassle in PDC. 
Your Daily Step goal is refreshed every time you load the main page, as it's stored directly on the device as your daily steps.
However, to give your partner pokemon steps, you'll need to Sync. You can only sync steps with your partner pokemon. What syncing does is send a request to the server asking for all your steps between now and your last sync. 
If it's your first time syncing, it takes your steps from now until the beginning of the day. This is to allow you to not fret about steps not syncing if you miss a day or two of checking the app!

I think it's important for this app to motivate you to exercize, but not require so much attention that it distract from the actual activity you're doing.

### Menu

To access the PDC menu, click the menu botton on the top right of the screen. From there, you'll be able to return to the main page, check your partner's stats, or go to your pc.

### Collecting Pokemon

Once you've reached your Daily Step Goal, you'll collect a new egg! The screen will pop up and simply follow the prompts.

**Please note: Since the daily steps reset each day, if you don't look at the home screen after reaching your goal you won't recieve an egg**

#### Gigantamax Pokemon

Training your Pokemon without battles is tough! But, if you're a stepping-go-getter and manage to get certain Pokemon to their absolute limit, you might get to see some Gigantamax Pokemon!

### Evolving Pokemon

All Pokemon evolve once the necessary steps have been walked. Pokemon that require stone or trade evolutions will now evolve at a certain level instead.
Evolution levels have been increased for all Pokemon in the app.

### Changing Partners

To change partners, go to the pc and click on a Pokemon. At first it might seem the click box is a little small, but try to aim just above the icon and it should work fine.
From there, there is a stats page that has a "Make Partner" button. Click that and now you can level and evolve your new partner!

## Find a bug/error?

If you seem to find something you think shouldn't be, please let me know!

## Credits

Special thanks to the Smogon Sword/Shield Sprite Project for the Gen 8 Sprites
