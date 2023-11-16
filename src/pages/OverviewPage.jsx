import '../stylesheets/OverviewPage.css'

function OverviewPage() {
    return(
        <>
            <div className="overviewPageContainer">
                {/* Left Menu Sidebar */}
                <div className="leftSidebar">
                    <div className="welcomePillDiv">
                        <span class="badge badge-pill badge-secondar welcomePill">
                            <div className="welcomePillPhoto"></div>
                            <p><span id="welcomePillText">Welcome</span><span>someone@my.unt.edu</span></p>
                        </span>
                    </div>
                </div>

                {/* Middle Portion */}
                <div className="middle">
                    
                </div>

                {/* Right Sidebar */}
                <div className="rightSidebar">
                    
                </div>
            </div>
            
        </>
    )
}

export default OverviewPage;