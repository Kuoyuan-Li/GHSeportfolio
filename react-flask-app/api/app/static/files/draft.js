<table className="table col-md-6 mx-auto">
                        {this.state.isLoading ?
                            <h1>Loading...</h1> :
                            <tbody>
                                <tr>
                                <td>Hi, {this.state.username},welcome to your profile page!</td>
                                <p>You can edit your eportfolio by clicking "View profile",...</p>
                                
                                </tr>
                            </tbody>}
                    </table>