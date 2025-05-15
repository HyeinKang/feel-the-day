/**
 * Loader
 *
 * A circular loading indicator for indicating loading state.
 *
 * @returns JSX.Element
 */
const Loader: React.FC = () => (
  <div className="w-4 h-4 rounded-full flex-shrink-0 bg-cyan-600 dark:bg-cyan-100 animate-[ping_1s_ease-in-out_infinite]" />
);
export default Loader;
