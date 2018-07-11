<template>
	<v-container home-wrapper v-if="$root.currentUser">
		<alert type="warning" v-if="!$root.currentUser.emailVerified" :isOpen="true" />

		<div v-if="$root.currentUser.emailVerified">
			<v-layout row>
				<v-flex xs12 md6 lg3>
					<v-card>
						<v-card-title primary-title>
							<h3>Public questions list</h3>
							<v-spacer></v-spacer>
							<v-btn
								icon
								@click="$router.push({name: 'create-questions'})">
								<v-icon>add</v-icon>
							</v-btn>
						</v-card-title>
					</v-card>
				</v-flex>

				<v-flex xs-12 md6 9>

				</v-flex>
			</v-layout>
		</div>
	</v-container>
</template>

<script>
import Alert from '@/components/Alert'

export default {
	name: 'Home',
	components: {
		Alert
	}
}
</script>
