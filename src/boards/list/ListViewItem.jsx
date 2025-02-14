/* eslint-disable react/prop-types */


function ListViewItem(props) {
    const { task } = props;
    return(
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-[#875B3E]">{task.title}</p>
              <p className="mt-1 truncate text-xs/5 text-[#646669]">{task.description}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6">{task.assignedTo}</p>
            <p className="mt-1 text-xs/5 text-[#646669]">
                Due: <time>{task.dueDate}</time>
            </p>
          </div>
        </li>
    );
};

export default ListViewItem;