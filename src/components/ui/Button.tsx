/**
 * Props for the Button component.
 */
export interface ButtonProps {
  value: string;
  role: string;
  ariaLabel: string;
  onClick: () => void | Promise<void>;
}
/**
 * Reusable Button component.
 */
const Button: React.FC<ButtonProps> = ({ value, role, ariaLabel, onClick }) => (
  <button
    type="button"
    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 dark:text-[#eeeeee] bg-white dark:bg-[#222222] border border-gray-400 dark:border-[#888] rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 dark:focus:ring-blue-800 cursor-pointer"
    aria-label={ariaLabel}
    role={role}
    onClick={() => {
      void onClick();
    }}
  >
    {value}
  </button>
);
export default Button;
