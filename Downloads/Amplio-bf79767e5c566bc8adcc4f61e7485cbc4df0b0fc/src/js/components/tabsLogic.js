export default function tabsLogic() {
  // Set the first tab to be active by default
  $(".btn-tabs").first().addClass("active");
  $(".tabs__list").first().addClass("active");

  $(".btn-tabs").on("click", function() {
      const tabsId = $(this).data("tabTarget");

      // Add the active class to the clicked tab button and its corresponding content
      $(this).addClass("active").siblings().removeClass("active");
      $("#" + tabsId).addClass("active").siblings().removeClass("active");
  });
}
