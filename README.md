# HCIForms

### What is HCI forms?
HCI forms is a JS set of functions, that compose a library. In order to present forms in what we have denominated as "Single task forms" which basically is presenting one question at a time.

### How do I use HCI forms? 
In this section we provide you with everything you need to know, in order to make HCI Forms work on your project.

#### How to install it:
Ok, this is still a work in progress so it hasn't been published as a npm package so you'll need to download the source files ```FPForm.js``` and the ```validator.js``` both files are needed to make ensure that HCI forms work properly. 

##### How HCI Forms is structured: 
HCI Forms took inspiration from how CSS frameworks manage their JS such as Bootstrap and Foundation. So basically there are classes that you add to your HTML document in order to make the single task forms work. As well as some specific HTML markup to add elements of navigation, title or anything. For a quick example check out the ```example.html``` for more detail check the following section of references. 

### HCI documentation

In this section we provide examples of how the library work and the supported type of questions in this current version. 

#### Basic HTML structure
Here we provide the basic structure of HCI form. Please read the HTML comments in order to understand what each class does.

```html
<body>
    <script src="public/js/FPForm.js"></script>
    <div id="form-wrapper">
        <div id="advance-bar">
        </div>
        <div id="header" class="medium-unstack"> 
            <h4>Here is your title</h4>
            <!-- Advance bar starts-->
            <div class="advance"> 
                <span class="answered-questions">0</span>
                <span class="slash">/</span>
                <span class="total-questions">0</span>
            </div>
            <!-- Advance bar ends-->
        </div>
        <div id="questions-wrapper"> <!-- All your questions should be contained inside a tag with this class -->
            <div class="question-item"> <!-- Each question needs to be wrapped by the .question-item class -->
                <h2 class="to-answer">Ingresa tu email</h2> <!-- This class defines that this is your question, JS script adds * to required questions -->
                <input type="email" required>
            </div>
            <div class="question-item">
                <h2 class="to-answer">Selecciona uno de los siguientes</h2>
                <div class="option-field"> <!-- If your question consist of a set of answers (radio or checkbox), add this class -->
                    <div class="option"> <!-- Every option needs to be wrapped by the .option class -->
                        <input type="radio" name="gender" value="male" id="opt_a" required>
                        <label for="opt_a">Male</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="gender" value="female" id="opt_b">
                        <label for="opt_b">Female</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="gender" value="other" id="opt_c">
                        <label for="opt_c">Other</label>
                    </div>
                </div>
            </div>
            <div class="question-item">
                <h2 class="to-answer">¿Que de estos te gustaria ganar?</h2>
                <div class="option-field">
                    <div class="option">
                        <input type="checkbox" name="gender" value="male" id="opt_1" required>
                        <label for="opt_1">iphone</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="gender" value="female" id="opt_2">
                        <label for="opt_2">ipad</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="gender" value="other" id="opt_3">
                        <label for="opt_3">Dinero</label>
                    </div>
                    <div class="option">
                        <input type="checkbox" name="gender" value="other" id="opt_4">
                        <label for="opt_4">Lo que sea es bueno</label>
                    </div>
                </div>
            </div>
            <div id='thanks-message'> <!-- This is your end message, thanks your user for taking the time to answer your survey  -->
                <h1>Thanks for answering this form</h1>
            </div>
        </div>
        <!-- Footer block starts  -->
        <div id="footer">
            <div class="controls">
                <button class="large hollow button" id="previous">previous</button>
                <button class="large hollow button" id="next">Continue</button>
                <button class="large hollow success button" id="submit">Submit</button>
            </div>
            <div class="anotation">
                <span>puedes presionar enter para continuar o las flechas &#8592; &#8594; para navegar</span>
            </div>
        </div>
        <!-- Footer block ends -->
    </div>
</body>
```

#### Open ended question
We define open ended questions are those that provide an input field to enter the question you want to, this current version only provides input validation for the following type of inputs:  **email, number, text and date**

Here is simple stencil of how your open ended question should look

``` html

<div class="question-item">
    <h2 class="to-answer">Input here your question</h2>
    <input type="email" required>
</div>

``` 
As seen in the example please make sure to specify the type attribute of the input tag in order to validate correctly. 

#### Optipon field questions
In the current version of the library we support up to 5 answer options per question. 

Here is a simple stencil to base your questions:

```html
<div class="question-item">
    <h2 class="to-answer">Whats your gender?</h2>
    <div class="option-field">
        <div class="option">
            <input type="checkbox" name="gender" value="male" id="opt_1" required>
                <label for="opt_1">iphone</label>
        </div>
        <div class="option">
            <input type="checkbox" name="gender" value="female" id="opt_2">
            <label for="opt_2">ipad</label>
        </div>
        <div class="option">
            <input type="checkbox" name="gender" value="other" id="opt_3">
            <label for="opt_3">Dinero</label>
        </div>     
    </div>
</div>
```
## Happy coding, if you are interested in colaborating to this project hit me up. And if you find a bug register the issue, I'll be forever thankful if you do so.
