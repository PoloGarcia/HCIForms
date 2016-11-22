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
