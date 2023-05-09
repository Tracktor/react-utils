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

interface getInitialParamsWithFirstNameOnly {
  firstName: string;
  lastName?: string;
  fullName?: never;
}

interface getInitialParamsWithLastNameOnly {
  firstName?: string;
  lastName: string;
  fullName?: never;
}

type getInitialParams =
  | getInitialParamsWithFullName
  | getInitialParamsWithFirstAndLastName
  | getInitialParamsWithFirstNameOnly
  | getInitialParamsWithLastNameOnly;

/**
 * Get initial from first name and last name or full name
 * @param name
 */
export const getInitials = (name: getInitialParams): string => {
  const [firstName, lastName] = name.fullName ? name.fullName.split(" ") : [name.firstName || "", name.lastName || ""];

  return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
};

export default getInitials;
