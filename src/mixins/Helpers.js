export default {
  methods: {
    copyToClipboard(text) {
      let textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        this.$noty.success('Copied')
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}