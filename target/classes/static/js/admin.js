function deleteUser(el){
    var user_id = $("#user_id").val();
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
            actions: 'my-actions',
            cancelButton: 'btn swal-cancel',
            confirmButton: 'btn swal-danger',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
            });
            $.ajax({
                type: "GET",
                url : "http://localhost:8080/admin/deleteUser/"+el+"/"+user_id,
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    });
}

function deleteGroup(el){
    var user_id = $("#user_id").val();
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        customClass: {
            actions: 'my-actions',
            cancelButton: 'btn swal-cancel',
            confirmButton: 'btn swal-danger',
        },
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "The group has been deleted.",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            $.ajax({
                type: "GET",
                url : "http://localhost:8080/admin/deleteGroup/"+user_id+"/"+el,
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    });
}
$(document).ready(function () {
    const table = $('#table');  // Users table
    const tbody = table.find('tbody');
    const prevPageBtn = $('#prevPage');
    const nextPageBtn = $('#nextPage');
    const pageNumbersSpan = $('#pageNumbers');
    const rowsPerPageSelect = $('#rowsPerPage');
    const searchInput = $('#filterUsers');

    // Get all table rows (this will include all Thymeleaf-rendered rows)
    let rows = tbody.find('tr').toArray();
    let filteredRows = [...rows]; // Initialize filtered rows to be all rows initially

    // Default settings
    let currentPage = 1;
    let rowsPerPage = 5;  // Set default rows per page to 5

    // Function to render the table rows based on pagination
    function renderTable() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rowsToDisplay = filteredRows.slice(start, end);

        // Clear the table body and re-render rows
        tbody.empty();
        rowsToDisplay.forEach(row => tbody.append(row));

        // Update pagination controls
        updatePaginationControls();
    }

    // Function to update pagination controls (prev, next, page numbers)
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

        // Disable previous button if on the first page
        prevPageBtn.prop('disabled', currentPage === 1);
        prevPageBtn.toggleClass('disabled', currentPage === 1);

        // Disable next button if on the last page
        nextPageBtn.prop('disabled', currentPage === totalPages);
        nextPageBtn.toggleClass('disabled', currentPage === totalPages);

        // Generate page numbers
        pageNumbersSpan.empty(); // Clear current page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = $('<a></a>')
                .attr('href', '#')
                .text(i)
                .addClass('page-number btn btn-link');

            // Add active class to the current page
            if (i === currentPage) {
                pageLink.addClass('current-page');
            }

            // Add event listener to change pages
            pageLink.on('click', (event) => {
                event.preventDefault();
                currentPage = i;
                renderTable();
            });

            pageNumbersSpan.append(pageLink);
        }
    }

    // Function to filter rows based on the search query
    function filterRows() {
        const filter = searchInput.val().toUpperCase();
        filteredRows = rows.filter(row => {
           const rowText = $(row).find('td').map(function() {return $(this).text().toUpperCase();}).get().join(' ');
            return rowText.indexOf(filter) > -1;
        });

        currentPage = 1; // Reset to the first page whenever a new search is performed
        renderTable();
    }

    // Event listener for search input
    searchInput.on('keyup', filterRows);

    // Event listener for previous page
    prevPageBtn.on('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    // Event listener for next page
    nextPageBtn.on('click', () => {
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Event listener for changing rows per page
    rowsPerPageSelect.on('change', (event) => {
        rowsPerPage = parseInt($(event.target).val(), 10);
        currentPage = 1; // Reset to first page when changing rows per page
        renderTable();
    });

    // Function to dynamically generate rows per page options based on filtered rows length
    function updateRowsPerPageOptions() {
        const totalRows = filteredRows.length;
        let options = [];

        // Start with 5, then dynamically generate options in increments of 5
        for (let i = 5; i <= totalRows; i += 5) {
            options.push(i);
        }

        // If the total number of rows is less than 5, fallback to just 5 as the only option
        if (totalRows < 5) {
            options = [5];
        }

        // If options is empty or does not have the 5 option, make sure to add 5 as the first option
        if (options.length === 0 || options[0] !== 5) {
            options.unshift(5);
        }

        // If the last option is still below the total rows, add the next higher multiple
        let lastOption = options[options.length - 1];
        if (lastOption < totalRows) {
            options.push(Math.ceil(totalRows / 5) * 5);  // Add the next multiple of 5 greater than totalRows
        }

        // Clear current options in the select dropdown
        rowsPerPageSelect.empty();

        // Add options dynamically
        options.forEach(option => {
            const optionElement = $('<option></option>').val(option).text(option);
            rowsPerPageSelect.append(optionElement);
        });

        // Default select value is the current rowsPerPage (which is now 5)
        rowsPerPageSelect.val(rowsPerPage);
    }

    // Initialize table rendering and rows per page options
    updateRowsPerPageOptions();
    renderTable();

    const tableGroup = $('#tableGroups');
    const tbodyGroup = tableGroup.find('tbody');
    const prevPageBtnGroup = $('#prevPageGroups');
    const nextPageBtnGroup = $('#nextPageGroups');
    const pageNumbersSpanGroup = $('#pageNumbersGroups');
    const rowsPerPageSelectGroup = $('#rowsPerPageGroups');
    const searchInputGroup = $('#filterGroups');


    // Get all table rows for Groups (this will include all Thymeleaf-rendered rows)
    let rowsGroup = tbodyGroup.find('tr').toArray();
    let filteredRowsGroup = [...rowsGroup]; // Initialize filtered rows to be all rows initially

    // Default settings
    let currentPageGroup = 1;
    let rowsPerPageGroup = 5;

    // Function to dynamically generate the options for rowsPerPage
    function generateRowsPerPageOptions() {
        const totalRows = filteredRowsGroup.length;
        const selectElement = rowsPerPageSelectGroup;

        // Clear existing options
        selectElement.empty();

        // Start adding options from 5 upwards, incrementing by 5 each time
        let optionValue = 5;
        while (optionValue <= totalRows) {
            const option = $('<option></option>').val(optionValue).text(optionValue);
            selectElement.append(option);
            optionValue += 5;
        }

        // Ensure the next higher multiple of 5 is added if needed (even if not exactly matching totalRows)
        let nextOption = Math.ceil(totalRows / 5) * 5;  // Find next multiple of 5
        if (nextOption > totalRows) {
            const option = $('<option></option>').val(nextOption).text(nextOption);
            selectElement.append(option);
        }

    }

    // Function to render table rows based on pagination for Groups
    function renderTableGroup() {
        const start = (currentPageGroup - 1) * rowsPerPageGroup;
        const end = start + rowsPerPageGroup;
        const rowsToDisplayGroup = filteredRowsGroup.slice(start, end);

        // Clear the table body and re-render rows
        tbodyGroup.empty();
        rowsToDisplayGroup.forEach(row => tbodyGroup.append(row));

        // Update pagination controls
        updatePaginationControlsGroup();
    }

    // Function to update pagination controls (prev, next, page numbers) for Groups
    function updatePaginationControlsGroup() {
        const totalPagesGroup = Math.ceil(filteredRowsGroup.length / rowsPerPageGroup);

        // Disable previous button if on first page
        prevPageBtnGroup.prop('disabled', currentPageGroup === 1);
        prevPageBtnGroup.toggleClass('disabled', currentPageGroup === 1);

        // Disable next button if on last page
        nextPageBtnGroup.prop('disabled', currentPageGroup === totalPagesGroup);
        nextPageBtnGroup.toggleClass('disabled', currentPageGroup === totalPagesGroup);

        // Generate page numbers
        pageNumbersSpanGroup.empty(); // Clear current page numbers
        for (let i = 1; i <= totalPagesGroup; i++) {
            const pageLinkGroup = $('<a></a>')
                .attr('href', '#')
                .text(i)
                .addClass('page-number btn btn-link');

            // Add active class to the current page
            if (i === currentPageGroup) {
                pageLinkGroup.addClass('current-page');
            }

            // Add event listener to change pages
            pageLinkGroup.on('click', (event) => {
                event.preventDefault(); // Prevent the default anchor click behavior
                currentPageGroup = i;
                renderTableGroup();
            });

            pageNumbersSpanGroup.append(pageLinkGroup);
        }
    }

    // Function to filter rows based on the search query for Groups
    function filterRowsGroup() {
        const filterGroup = searchInputGroup.val().toUpperCase();
        filteredRowsGroup = rowsGroup.filter(row => {
            // Get all text content from each row's cells
            const rowTextGroup = $(row).find('td').map((_, cell) => $(cell).text().toUpperCase()).get().join(' ');
            return rowTextGroup.indexOf(filterGroup) > -1;
        });

        currentPageGroup = 1; // Reset to first page whenever a new search is performed
        generateRowsPerPageOptions(); // Regenerate the rowsPerPage options based on the filtered data
        renderTableGroup();
    }

    // Event listener for search input
    searchInputGroup.on('keyup', filterRowsGroup);

    // Event listener for previous page
    prevPageBtnGroup.on('click', () => {
        if (currentPageGroup > 1) {
            currentPageGroup--;
            renderTableGroup();
        }
    });

    // Event listener for next page
    nextPageBtnGroup.on('click', () => {
        const totalPagesGroup = Math.ceil(filteredRowsGroup.length / rowsPerPageGroup);
        if (currentPageGroup < totalPagesGroup) {
            currentPageGroup++;
            renderTableGroup();
        }
    });

    // Event listener for changing rows per page
    rowsPerPageSelectGroup.on('change', function() {
        rowsPerPageGroup = parseInt($(this).val(), 10);
        currentPageGroup = 1; // Reset to first page when changing rows per page
        renderTableGroup();
    });

    // Initialize the table and generate rowsPerPage options
    generateRowsPerPageOptions();
    renderTableGroup();
});
