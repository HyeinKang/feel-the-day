interface ButtonProps {
  value: string;
  role: string;
  ariaLabel: string;
  onClick: () => void | Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ value, role, ariaLabel, onClick }) => (
  <button
    type="button"
    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
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
