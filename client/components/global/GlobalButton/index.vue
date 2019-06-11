<template>
  <div
    :class="['btn inline',size,type]"
    @click="$emit('click')"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'IButton',
    props: {
      size: {
        type: String,
        default: 'btn-sm'
      },
      type: {
        type: String,
        default: 'btn-default'
      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/less/variables/index";

  @brand-primary: darken(#428bca, 6.5%);
  @brand-success: #5cb85c;
  @brand-info: #5bc0de;
  @brand-warning: #ffea00;
  @brand-danger: #d9534f;
  .button-variant(@color; @background; @border) {
    color: @color;
    background-color: @background;
    border: 1px solid @border;
  }

  // GlobalButton sizes
  .button-size(@padding-vertical; @padding-horizontal; @font-size; @line-height; @border-radius) {
    padding: @padding-vertical @padding-horizontal;
    font-size: @font-size;
    //line-height: @line-height;
    border-radius: @border-radius;
  }

  @btn-default-color: #333;
  @btn-default-bg: #fff;
  @btn-default-border: #ccc;

  @btn-primary-color: #fff;
  @btn-primary-bg: @brand-primary;
  @btn-primary-border: darken(@btn-primary-bg, 5%);

  @btn-success-color: #fff;
  @btn-success-bg: @brand-success;
  @btn-success-border: darken(@btn-success-bg, 5%);

  @btn-info-color: #fff;
  @btn-info-bg: @brand-info;
  @btn-info-border: darken(@btn-info-bg, 5%);

  @btn-warning-color: #fff;
  @btn-warning-bg: @brand-warning;
  @btn-warning-border: darken(@btn-warning-bg, 5%);

  @btn-danger-color: #fff;
  @btn-danger-bg: @brand-danger;
  @btn-danger-border: darken(@btn-danger-bg, 5%);

  .btn {
    display: inline-block;
    margin-bottom: 0; // For input.btn
    //text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
    //white-space: nowrap;
    .button-size(6px; 12px; 14px; 1.4285; 4px);
    user-select: none;
    /*font: 400 13.3333px Arial;*/
    vertical-align:middle;
    text-align: center;
    line-height:1.2;
    //&:focus,
    //&.focus {
    //  color: @btn-default-color;
    //  text-decoration: none;
    //}

    &:active,
    &.active {
      background-image: none;
      /*box-shadow: inset 0 0px 1000px rgba(0, 0, 0, .125);*/
    }

    &.disabled,
    &[disabled],
    fieldset[disabled] & {
      cursor: not-allowed;
      opacity: .65;
      box-shadow: none;
    }

    a& {
      &.disabled,
      fieldset[disabled] & {
        pointer-events: none; // Future-proof disabling of clicks on `<a>` elements
      }
    }
  }

  // Alternate buttons
  // --------------------------------------------------

  .btn-default,
  .tag-default {
    .button-variant(@btn-default-color; @btn-default-bg; @btn-default-border);
  }

  .btn-theme-color,
  .tag-theme-color {
    .button-variant(@theme-color; transparent; @theme-color);
  }

  .btn-primary-color,
  .tag-primary-color {
    .button-variant(@btn-primary-border; transparent; @btn-primary-border);
  }

  // Success appears as green
  .btn-success-color,
  .tag-success-color {
    .button-variant(@btn-success-border; transparent; @btn-success-border);
  }

  // Info appears as blue-green
  .btn-info-color,
  .tag-info-color {
    .button-variant(@btn-info-border; transparent; @btn-info-border);
  }

  .btn-primary-color,
  .tag-primary-color {
    .button-variant(@btn-primary-border; transparent; @btn-primary-border);
  }

  // Warning appears as orange
  .btn-warning-color,
  .tag-warning-color {
    .button-variant(@btn-warning-border; transparent; @btn-warning-border);
   
  }

  // Warning appears as orange
  .btn-white-color,
  .tag-white-color {
    .button-variant(#fff; transparent; #fff);
  }

  // Danger and error appear as red
  .btn-danger-color,
  .tag-danger-color {
    .button-variant(@btn-danger-border; transparent; @btn-danger-border);
  }

  .btn-primary,
  .tag-primary {
    .button-variant(@btn-primary-color; @btn-primary-bg; @btn-primary-border);
  }

  .btn-theme,
  .tag-theme {
    .button-variant(#fff; @theme-color; @theme-color);
  }

  // Success appears as green
  .btn-success,
  .tag-success {
    .button-variant(@btn-success-color; @btn-success-bg; @btn-success-border);
  }

  // Info appears as blue-green
  .btn-info,
  .tag-info {
    .button-variant(@btn-info-color; @btn-info-bg; @btn-info-border);
  }

  // Warning appears as orange
  .btn-warning,
  .tag-warning {
    .button-variant(@btn-warning-color; @btn-warning-bg; @btn-warning-border);
     a{
      color:#000;
    }
  }

  // Danger and error appear as red
  .btn-danger,
  .tag-danger {
    .button-variant(@btn-danger-color; @btn-danger-bg; @btn-danger-border);
  }

  // Link buttons
  // -------------------------

  // GlobalButton Sizes
  // --------------------------------------------------

  .btn-lg {
    // line-height: ensure even-numbered height of button next to large input
    .button-size(10px; 16px; 18px; 1.333333; 6px);
  }

  .btn-sm {
    // line-height: ensure proper height of button next to small input
    .button-size(5px; 10px; 16px; 1.5; 3px);
  }

  .btn-xs {
    .button-size(1px; 5px; 12px; 1.5; 3px);
  }

  // Block button
  // --------------------------------------------------

  .btn-block {
    display: block;
    width: 100%;
  }

  // Vertically space out multiple block buttons
  .btn-block + .btn-block {
    margin-top: 5px;
  }

  // Specificity overrides
  input[type="submit"],
  input[type="reset"],
  input[type="button"] {
    &.btn-block {
      width: 100%;
    }
  }
</style>
