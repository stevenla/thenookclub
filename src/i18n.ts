import Polyglot from "node-polyglot";

const polyglot = new Polyglot({
  allowMissing: true,
  onMissingKey: (key) => {
    console.error("missing key", key);
    return key;
  },
});
const t = polyglot.t.bind(polyglot);

export { polyglot, t };
