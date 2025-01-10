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

interface getInitialParamsWithNoName {
  firstName?: never;
  lastName?: never;
  fullName?: never;
}

type getInitialParams =
  | getInitialParamsWithFullName
  | getInitialParamsWithFirstAndLastName
  | getInitialParamsWithFirstNameOnly
  | getInitialParamsWithLastNameOnly
  | getInitialParamsWithNoName;

/**
 * Get initial from first name and last name or full name
 * @param name
 * @param capitalize
 */
export const getInitials = (name: getInitialParams, capitalize?: boolean): string => {
  const [firstName, lastName] = name.fullName ? name.fullName.split(" ") : [name.firstName || "", name.lastName || ""];

  return capitalize
    ? `${firstName?.charAt(0).toUpperCase()}${lastName?.charAt(0).toUpperCase()}`
    : `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
};

export default getInitials;
