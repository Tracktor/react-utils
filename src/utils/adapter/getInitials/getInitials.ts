import isString from "@/utils/is/isString/isString";

interface getInitialParamsWithFullName {
  firstName?: never;
  lastName?: never;
  fullName: string | null;
}

interface getInitialParamsWithFirstAndLastName {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  fullName?: never;
}

interface getInitialParamsWithFirstNameOnly {
  firstName: string | null | undefined;
  lastName?: string | null | undefined;
  fullName?: never;
}

interface getInitialParamsWithLastNameOnly {
  firstName?: string | null | undefined;
  lastName: string | null | undefined;
  fullName?: never;
}

interface getInitialParamsWithNoName {
  firstName?: never;
  lastName?: never;
  fullName?: never;
}

type getInitialParams =
  | string
  | null
  | undefined
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
  if (!name) {
    return "";
  }

  const [firstName = "", lastName = ""] = isString(name)
    ? name.split(" ")
    : name.fullName
      ? name.fullName.split(" ")
      : [name.firstName || "", name.lastName || ""];

  return capitalize
    ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
    : `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export default getInitials;
