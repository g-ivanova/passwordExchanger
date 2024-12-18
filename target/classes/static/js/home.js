$(document).ready(function() {
    function filterReceivedPass(event) {
        var input = $("#filterReceivedPass");
        var filter = input.val().toUpperCase();
        var rows = $("#table tbody").children();
        rows.each(function() {
            var row = $(this);
            if (row.text().toUpperCase().indexOf(filter) > -1) {
                row.show();
            } else {
                row.hide();
            }
        });
    }
    $("#filterReceivedPass").on('keyup', filterReceivedPass);
    function filterSentPass(event) {
        var input = $("#filterSentPass");
        var filter = input.val().toUpperCase();
        var rows = $("#sentPass tbody").children();
        rows.each(function() {
            var row = $(this);
            if (row.text().toUpperCase().indexOf(filter) > -1) {
                row.show();
            } else {
                row.hide();
            }
        });
    }
    $("#filterSentPass").on('keyup', filterSentPass);
    $('.admin_settings').hide();
    var username = $("#username").val();
    if (username == "admin") {
        $('.admin_settings').show(); // Show the link if the user is admin
    } else {
        $('.admin_settings').hide(); // Hide the link if the user is not admin
    }

    const tableReceived = $('#table');  // Users table
    const tbody = tableReceived.find('tbody');
    const prevPageBtn = $('#prevPageReceived');
    const nextPageBtn = $('#nextPageReceived');
    const pageNumbersSpan = $('#pageNumbersReceived');
    const rowsPerPageSelect = $('#rowsPerPageReceived');
    const searchInput = $('#filterReceivedPass');

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
            const pageLink = $('<a></a>').attr('href', '#').text(i).addClass('page-number btn btn-link');

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

    const tableSent = $('#sentPass');
    const tbodySent = tableSent.find('tbody');
    const prevPageBtnSent = $('#prevPageSent');
    const nextPageBtnSent = $('#nextPageSent');
    const pageNumbersSpanSent = $('#pageNumbersSent');
    const rowsPerPageSelectSent = $('#rowsPerPageSent');
    const searchInputSent = $('#filterSentPass');


    // Get all table rows for Groups (this will include all Thymeleaf-rendered rows)
    let rowsSent = tbodySent.find('tr').toArray();
    let filteredRowsSent = [...rowsSent]; // Initialize filtered rows to be all rows initially

    // Default settings
    let currentPageSent = 1;
    let rowsPerPageSent = 5;

    // Function to dynamically generate the options for rowsPerPage
    function generateRowsPerPageOptions() {
        const totalRows = filteredRowsSent.length;
        const selectElement = rowsPerPageSelectSent;

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
    function renderTableSent() {
        const start = (currentPageSent - 1) * rowsPerPageSent;
        const end = start + rowsPerPageSent;
        const rowsToDisplaySent = filteredRowsSent.slice(start, end);

        // Clear the table body and re-render rows
        tbodySent.empty();
        rowsToDisplaySent.forEach(row => tbodySent.append(row));

        // Update pagination controls
        updatePaginationControlsSent();
    }

    // Function to update pagination controls (prev, next, page numbers) for Groups
    function updatePaginationControlsSent() {
        const totalPagesSent = Math.ceil(filteredRowsSent.length / rowsPerPageSent);

        // Disable previous button if on first page
        prevPageBtnSent.prop('disabled', currentPageSent === 1);
        prevPageBtnSent.toggleClass('disabled', currentPageSent === 1);

        // Disable next button if on last page
        nextPageBtnSent.prop('disabled', currentPageSent === totalPagesSent);
        nextPageBtnSent.toggleClass('disabled', currentPageSent === totalPagesSent);

        // Generate page numbers
        pageNumbersSpanSent.empty(); // Clear current page numbers
        for (let i = 1; i <= totalPagesSent; i++) {
            const pageLinkSent = $('<a></a>').attr('href', '#').text(i).addClass('page-number btn btn-link');

            // Add active class to the current page
            if (i === currentPageSent) {
                pageLinkSent.addClass('current-page');
            }

            // Add event listener to change pages
            pageLinkSent.on('click', (event) => {
                event.preventDefault(); // Prevent the default anchor click behavior
                currentPageSent = i;
                renderTableSent();
            });

            pageNumbersSpanSent.append(pageLinkSent);
        }
    }

    // Function to filter rows based on the search query for Sent
    function filterRowsSent() {
        const filterSent = searchInputSent.val().toUpperCase();
        filteredRowsSent = rowsSent.filter(row => {
            // Get all text content from each row's cells
            const rowTextSent = $(row).find('td').map((_, cell) => $(cell).text().toUpperCase()).get().join(' ');
            return rowTextSent.indexOf(filterSent) > -1;
        });

        currentPageSent = 1; // Reset to first page whenever a new search is performed
        generateRowsPerPageOptions(); // Regenerate the rowsPerPage options based on the filtered data
        renderTableSent();
    }

    // Event listener for search input
    searchInputSent.on('keyup', filterRowsSent);

    // Event listener for previous page
    prevPageBtnSent.on('click', () => {
        if (currentPageSent > 1) {
            currentPageSent--;
            renderTableSent();
        }
    });

    // Event listener for next page
    nextPageBtnSent.on('click', () => {
        const totalPagesSent = Math.ceil(filteredRowsSent.length / rowsPerPageSent);
        if (currentPageSent < totalPagesSent) {
            currentPageSent++;
            renderTableSent();
        }
    });

    // Event listener for changing rows per page
    rowsPerPageSelectSent.on('change', function() {
        rowsPerPageSent = parseInt($(this).val(), 10);
        currentPageSent = 1; // Reset to first page when changing rows per page
        renderTableSent();
    });

    // Initialize the table and generate rowsPerPage options
    generateRowsPerPageOptions();
    renderTableSent();

});
function CopyText(id){
    let text = $("#" + id + "sendpass").text();
    navigator.clipboard.writeText(text);
}
function SeeText(id){
    let div = $("#" + id);
    let eye = $("#" + id + "eye");
    let slashedEye = $("#" + id + "slashedEye");
    if (div.html() == "******") {
        div.css('visibility', 'visible');
        div.text($("#" + id + "sendpass").text());
        eye.hide();
        slashedEye.show();
    } else {
        div.css('visibility', 'visible');
        div.html("******");
        eye.show();
        slashedEye.hide();
    }
}

function CopyTextAndDelete(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/passwordValidity?id=" + id,
        contentType: "application/json",
        success: function () {
            let text = $("#" + id + "pass").html();
            navigator.clipboard.writeText(text);
        },
        error: function () {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}
function SeeTextAndDelete(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/passwordValidity?id=" + id,
        contentType: "application/json",
        success: function () {
            let div = $("#" + id);
            let eye = $("#" + id + "eye");
            let pass = $("#" + id + "pass");
            let slashedEye = $("#" + id + "slashedEye");
            if (div.html() == "******") {
                div.css('visibility', 'visible');
                div.text(pass.text());
                eye.hide();
                slashedEye.show();
            } else {
                div.css('visibility', 'visible');
                div.html("******");
                eye.show();
                slashedEye.hide();
            }
        },
        error: function () {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}

function deletePassword(el){
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
                text: "The password has been deleted.",
                icon: "success",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
            });
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/home/" + user_id + "/" + el,
                contentType: "application/json",
                success: function () {
                    location.reload();
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    });
}