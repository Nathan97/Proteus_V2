var g = new JSGantt.GanttChart(document.getElementById('external-Gantt'), 'day');

if (g.getDivId() != null) {
    g.setCaptionType('Resource');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
    g.setShowTaskInfoLink(1); // Show link in tool tip (0/1)
    g.setDayMajorDateDisplayFormat('dd mon');
    g.setDateTaskDisplayFormat('dd month yyyy HH:MI');
    // Use the XML file parser
    JSGantt.parseXML('project.xml', g)

    g.Draw();
} else {
    alert("Error, unable to create Gantt Chart");
}