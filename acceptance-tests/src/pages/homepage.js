import commonCommands from '../common/commands';
import commonElements from '../common/elements';

module.exports = {
  url: function () {
    return `${this.api.launch_url}${this.api.globals.context_path}/`;
  },
  commands: [commonCommands],
  elements: [commonElements]
};
