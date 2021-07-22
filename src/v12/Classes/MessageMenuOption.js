const { resolveString } = require('discord.js').Util;

class MessageMenuOption {
  constructor(data = {}) {
    this.setup(data);
  }

  setup(data) {
    this.label = 'label' in data && data.label ? resolveString(data.label) : undefined;

    this.value = 'value' in data && data.value ? resolveString(data.value) : undefined;

    this.default = 'default' in data && typeof data.default === 'boolean' ? data.default : false;

    if (data.emoji) this.setEmoji(data.emoji);

    this.description = 'description' in data ? data.description : undefined;

    return this;
  }

  setLabel(label) {
    this.label = resolveString(label);
    return this;
  }

  setValue(value) {
    this.value = resolveString(value);
    return this;
  }

  setDescription(value) {
    this.description = resolveString(value);
    return this;
  }

  setDefault(def = false){
    this.default = typeof def === 'boolean' ? def : false;
    return this;
  }

  setEmoji(emoji, animated) {
    if (!emoji) throw new Error('MISSING_EMOJI: On this option was used `.setEmoji` method without emoji');

    this.emoji = {
      id: undefined,
      name: undefined,
    };

    if (!isNaN(emoji)) this.emoji.id = emoji;
    if (!isNaN(emoji.id)) this.emoji.id = emoji.id;
    if (emoji.name) this.emoji.name = emoji.name;

    if (!this.emoji.id && !this.emoji.name) this.emoji.name = emoji;

    if (typeof animated === 'boolean') this.emoji.animated = animated;

    return this;
  }

  toJSON() {
    return {
      label: this.label,
      value: this.value,
      emoji: this.emoji,
      description: this.description,
      default: this.default
    };
  }
}

module.exports = MessageMenuOption;
