$(function () {
  /* Select all the code blocks */
  const elements = $('.js-component-style')

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    app({
      target: element,
      extraProps: ['position'],
      focus: false
    })
  }
})


function app (args) {
  const { target, extraProps = [], focus = false } = args

  /* TODO: Extra props should be part of the .js-code data-attribute so we spread it to the default list */
  const desireProps = [...extraProps, 'font-family', 'color', 'background-color', 'font-size', 'font-weight', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];

  /* TODO: Enable focus on target element */
  if (focus) {
    $(target).find('.js-component-wrap').children().focus()
  }

  desireProps.forEach(value => {
    /* Get each computed style */
    /* Colors are read as RBG values, they're plenty of functions for convertions https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb  */
    const element = $(target).find('.js-code').children()[0]
    var theCSSprop = window.getComputedStyle(element, null).getPropertyValue(value);

    /* Fill with margins properties */
    if (theCSSprop.length > 0 && value.includes('margin')) {
      switch (value) {
        case 'margin-top':
          return $(target).find('.top').text(theCSSprop)
        case 'margin-right':
          return $(target).find('.right').text(theCSSprop)
        case 'margin-bottom':
          return $(target).find('.bottom').text(theCSSprop)
        case 'margin-left':
          return $(target).find('.left').text(theCSSprop)
        default:
          return value
      }
    }

    /* Fill the rest of the properties*/
    if (theCSSprop.length > 0 && !value.includes('margin')) {
      return $(target).find('ul').append(`<li>${value}: ${theCSSprop}</li>`);
    }
  })
}
