interface getInitialParamsWithFullName {
  firstName?: never;
  lastName?: never;
  fullName: string;
}

interface getInitialParamsWithFirstAndLastName {
  firstName: string;
  lastName: string;
  fullName?: never;
}

type getInitialParams = getInitialParamsWithFullName | getInitialParamsWithFirstAndLastName;

/**
 * Get initial from first name and last name or full name
 * @param firstName
 * @param lastName
 * @param fullName
 */
export const getInitials = ({ firstName, lastName, fullName }: getInitialParams): string => {
  const [first, last] = fullName ? fullName.split(" ") : [firstName, lastName];

  return `${first?.charAt(0)}${last?.charAt(0)}`;
};

export default getInitials;
