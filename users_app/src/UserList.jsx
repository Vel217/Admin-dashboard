import { useEffect } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { block, deleteId, getlist, logout, unblock } from "./api";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Button from "./components/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserList() {
  useEffect(() => {
    getlist()
      .then((res) => res.json())
      .then((data) => setPeople(data));
  }, []);

  const [people, setPeople] = useState([]);
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let url = location.pathname;
    setActiveId(url.replace(/[^0-9]/g, ""));
  }, []);

  const clickBlock = () => {
    let blockedID = selectedPeople.map((item) => item.user_id);
    const isActiveId = selectedPeople.filter(
      (item) => item.user_id == activeId
    );

    if (isActiveId.length > 0) {
      navigate("/");
    }

    block(blockedID).then((data) => {
      if (data.status === 200) {
        getlist()
          .then((res) => res.json())
          .then((data) => setPeople(data));
        setSelectedPeople([]);
      }
    });
  };
  const clickUnblock = () => {
    let unblockedID = selectedPeople.map((item) => item.user_id);
    unblock(unblockedID).then((data) => {
      if (data.status === 200) {
        getlist()
          .then((res) => res.json())
          .then((data) => setPeople(data));
        setSelectedPeople([]);
      }
    });
  };
  const clickDelete = () => {
    let deleteID = selectedPeople.map((item) => item.user_id);
    deleteId(deleteID).then((data) => {
      if (data.status === 200) {
        getlist()
          .then((res) => res.json())
          .then((data) => setPeople(data));
        setSelectedPeople([]);
      }
    });
  };

  const clickLogout = () => {
    logout().then((res) => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  };

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-8 sm:px-6 lg:px-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mt-10  text-center text-2xl font-semibold leading-10 text-emerald-600 ">
            Users
          </h1>
        </div>
      </div>
      <div className="  top-0 my-5 flex h-12 items-center justify-between space-x-3  sm:left-12">
        <div className="  top-0  flex h-12 items-center space-x-3  sm:left-12">
          <button
            onClick={clickBlock}
            type="button"
            className="bg-orange-200 inline-flex items-center rounded bg-orange-300 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            Block
          </button>
          <button
            type="button"
            onClick={clickUnblock}
            className="bg-green-200 inline-flex items-center rounded bg-green-300 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="1 1 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
            </svg>
            Unblock
          </button>
          <button
            type="button"
            onClick={clickDelete}
            className="bg-red-300 inline-flex items-center rounded bg-red-300 px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="1 1 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
        <div className="inline-flex">
          <Button type="button" title="logout" onClick={clickLogout}></Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-m dle sm:px-6 lg:px-8">
            <div className="relative">
              <table className="min-w-full table-auto  overflow-auto divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className=" py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Registration date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last active date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr
                      key={person.user_id}
                      className={
                        selectedPeople.includes(person)
                          ? "bg-gray-50"
                          : undefined
                      }
                    >
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedPeople.includes(person) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-emerald-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                          value={person.email}
                          checked={selectedPeople.includes(person)}
                          onChange={(e) =>
                            setSelectedPeople(
                              e.target.checked
                                ? [...selectedPeople, person]
                                : selectedPeople.filter((p) => p !== person)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                          selectedPeople.includes(person)
                            ? "text-emerald-600"
                            : "text-gray-900"
                        )}
                      >
                        {(person.user_id - 1) / 10 + 1}
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                          selectedPeople.includes(person)
                            ? "text-emerald-600"
                            : "text-gray-900"
                        )}
                      >
                        {person.firstname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(person.register_date), "yyyy/MM/dd")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(person.last_activity), "yyyy/MM/dd")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            "inline-flex rounded-full px-2 text-xs font-semibold leading-5 ",
                            person.is_blocked === 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {person.is_blocked === 0 ? "active" : "blocked"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
