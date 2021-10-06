import React, { Component } from 'react';
import $ from 'jquery';
import {PieChart} from 'react-easy-chart';
import {Legend} from 'react-easy-chart';

export default class SearchUsers extends Component{
    constructor() {
	    super();
        this.state = {
            username: '', 
            list: [], 
            repo: [],
            dados: [],
            total_users: '', 
            total_contributions: ''
        };
        this.setUsername = this.setUsername.bind(this);
        this.setUserRepo = this.setUserRepo.bind(this);
        this.getData = this.getData.bind(this);
        this.getRepoStats = this.getRepoStats.bind(this);
    }
    setUsername(data){
        this.setState({username: data.target.value});
    }  
    setUserRepo(data){
        this.setState({repo: data.target.value});
    }
    getRepoStats(data){
        fetch(data.target.value + '/contributors')
            .then(response => response.json()).then(success => {
                let total_contributions = 0;
                let total_users = [];
                if(success && success.length){
                    let state = this;
                    for(var i = 0; i < success.length; i++){
                        total_contributions = total_contributions + success[i].contributions;                   
                        total_users.push(success[i]);
                    };
                    state.setState({
                        dados: [
                            {key: 'Total de usuários: ' + total_users.length, value: total_users},
                            {key: 'Total de contribuidores: ' + total_contributions, value: total_contributions}
                        ]             
                    });
                    state.setState({total_users: total_users});
                    state.setState({total_contributions: total_contributions});
                }
            }).catch(error => {
                if(error){
                    console.log(error);
                }
            }); 
    }
    getData(e){
        e.preventDefault();
        $.ajax({
			url: 'https://api.github.com/users/'+ this.state.username +'/repos',
			dataType: 'json',
			success: function(data){
                this.setState({list: data});
                alert('Foi');

			}.bind(this), 
			error: function(data){
				if(data && data.status === 404){
					console.log(data.statusText);
				}
			}
		});
    }  
    render(){
        return(
            <div>
                <h1 className="title">Encontre usuários no GitHub</h1>
                <form onSubmit={this.getData}>
                    <input type="text" name="username" placeholder="Buscar..." onChange={this.setUsername} label="username" />
                </form>
                <form>
                    <select onChange={this.getRepoStats}>
                        <option>Repositórios</option>
                        {
                            this.state.list.map(function(data){
                                return(
                                    <option value={data.url} key={data.id}> {data.full_name } </option>   
                                )
                            })
                        }
                    </select>
                </form>               
                <div className="charts">
                    <PieChart 
                        size={400}
                        innerHoleSize={200}
                        data={[
                            {value: this.state.total_users.length},
                            {value: this.state.total_contributions}
                        ]} />
                    <Legend data={this.state.dados} dataId={'key'} />
                </div>
            </div>
        );
    }
}